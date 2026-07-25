// Parsing the X12 271 response Stedi returns. Everything here is defensive: a payer can
// omit any of these segments, and the demo must degrade to "we couldn't read a copay"
// rather than throwing.

/** Service type code for Mental Health. This is the one we actually care about. */
const MENTAL_HEALTH = "MH";
/** Time qualifier 29 = "Remaining". */
const REMAINING = "29";

type BenefitEntry = {
  code?: string;
  name?: string;
  serviceTypeCodes?: string[];
  serviceTypes?: string[];
  benefitAmount?: string;
  benefitPercent?: string;
  timeQualifierCode?: string;
  inPlanNetworkIndicatorCode?: string;
  planCoverage?: string;
  insuranceType?: string;
  additionalInformation?: { description?: string }[];
};

export type Stedi271 = {
  planStatus?: {
    statusCode?: string;
    status?: string;
    planDetails?: string;
    serviceTypeCodes?: string[];
  }[];
  planInformation?: { groupDescription?: string; groupNumber?: string };
  benefitsInformation?: BenefitEntry[];
  payer?: { name?: string };
  errors?: unknown[];
};

export type ParsedEligibility = {
  active: boolean;
  planName: string | null;
  insuranceType: string | null;
  /** Outpatient mental-health copay in dollars, in-network. */
  copay: number | null;
  /** In-network mental-health coinsurance as a percentage (20, not 0.2). */
  coinsurance: number | null;
  deductibleRemaining: number | null;
  /** Human-readable lines we can show as "how we read your benefits". */
  evidence: string[];
};

function isInNetwork(b: BenefitEntry) {
  return b.inPlanNetworkIndicatorCode === "Y";
}

function coversMentalHealth(b: BenefitEntry) {
  return (b.serviceTypeCodes ?? []).includes(MENTAL_HEALTH);
}

function num(v: string | undefined): number | null {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function parseEligibility(res: Stedi271): ParsedEligibility {
  const benefits = res.benefitsInformation ?? [];
  const evidence: string[] = [];

  const active =
    (res.planStatus ?? []).some((s) => s.statusCode === "1") ||
    benefits.some((b) => b.code === "1");

  const activeEntry = benefits.find((b) => b.code === "1");
  const planName =
    (res.planStatus ?? []).find((s) => s.planDetails)?.planDetails ??
    activeEntry?.planCoverage ??
    res.planInformation?.groupDescription ??
    null;
  const insuranceType = activeEntry?.insuranceType ?? null;

  if (active) {
    evidence.push(
      planName
        ? `Payer returned active coverage under ${planName}.`
        : "Payer returned active coverage.",
    );
  }

  // Outpatient mental-health copay: the most specific in-network co-payment entry
  // that names Mental Health as a covered service type.
  const copayEntry = benefits
    .filter(
      (b) => b.code === "B" && isInNetwork(b) && coversMentalHealth(b),
    )
    // Prefer the entry that explicitly mentions outpatient mental health.
    .sort((a, b) => {
      const score = (e: BenefitEntry) =>
        (e.additionalInformation ?? []).some((i) =>
          /mental health \(outpatient\)/i.test(i.description ?? ""),
        )
          ? 0
          : 1;
      return score(a) - score(b);
    })[0];
  const copay = num(copayEntry?.benefitAmount);
  if (copay !== null) {
    evidence.push(
      `Co-payment of $${copay} listed for in-network mental health (service type MH).`,
    );
  }

  const coinsEntry = benefits.find(
    (b) => b.code === "A" && isInNetwork(b) && coversMentalHealth(b),
  );
  const coinsRaw = num(coinsEntry?.benefitPercent);
  // Stedi returns coinsurance as a fraction (0.2 = 20%).
  const coinsurance = coinsRaw === null ? null : Math.round(coinsRaw * 100);
  if (coinsurance !== null) {
    evidence.push(
      `Co-insurance of ${coinsurance}% listed for in-network mental health.`,
    );
  }

  const dedEntry = benefits.find(
    (b) =>
      b.code === "C" && isInNetwork(b) && b.timeQualifierCode === REMAINING,
  );
  const deductibleRemaining = num(dedEntry?.benefitAmount);
  if (deductibleRemaining !== null) {
    evidence.push(
      `Individual in-network deductible remaining: $${deductibleRemaining}.`,
    );
  }

  if (!active) {
    evidence.push(
      "Payer did not return an active coverage segment for this member.",
    );
  }

  return {
    active,
    planName,
    insuranceType,
    copay,
    coinsurance,
    deductibleRemaining,
    evidence,
  };
}
