import { CLINICIANS, type Clinician } from "./clinicians";
import { STATES } from "./payers";

// Deliberately rule-based, not a score. Every card shows the checks it passed, because
// "here is a 0.87 match" is exactly the black box this product exists to replace.

export type MatchReason = {
  label: string;
  detail: string;
};

export type Match = {
  clinician: Clinician;
  reasons: MatchReason[];
  nextSlot: string;
};

export type MatchFunnel = {
  total: number;
  licensed: number;
  inNetwork: number;
  treatsCondition: number;
};

export type MatchOutput = {
  matches: Match[];
  funnel: MatchFunnel;
  /** True when we had to relax the condition filter to fill three cards. */
  relaxedCondition: boolean;
};

const DAY_ORDER = [
  "today",
  "tomorrow",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

/** Rough "how soon is this" ordering from the human-readable slot label. */
function slotRank(slot: string): number {
  const lower = slot.toLowerCase();
  const isNextWeek = lower.startsWith("next ");
  const day = DAY_ORDER.findIndex((d) =>
    lower.replace(/^next\s+/, "").startsWith(d),
  );
  const base = day === -1 ? DAY_ORDER.length : day;
  return base + (isNextWeek ? 100 : 0);
}

function soonestSlot(c: Clinician): string {
  return [...c.slots].sort((a, b) => slotRank(a) - slotRank(b))[0];
}

export function matchClinicians({
  state,
  payerId,
  payerName,
  planName,
  copay,
  condition,
}: {
  state: string;
  payerId: string;
  payerName: string;
  planName: string;
  copay: number | null;
  condition: string;
}): MatchOutput {
  const licensed = CLINICIANS.filter((c) => c.licensedIn.includes(state));
  const inNetwork = licensed.filter((c) => c.acceptedPayers.includes(payerId));
  const treats = inNetwork.filter((c) => c.conditions.includes(condition));

  // If the condition filter leaves fewer than three, fall back to the in-network pool
  // rather than showing an empty screen — and say so on the page.
  const relaxedCondition = treats.length < 3;
  const pool = relaxedCondition ? inNetwork : treats;

  const ranked = [...pool].sort((a, b) => {
    const treatsA = a.conditions.includes(condition) ? 0 : 1;
    const treatsB = b.conditions.includes(condition) ? 0 : 1;
    if (treatsA !== treatsB) return treatsA - treatsB;
    const slotDiff = slotRank(soonestSlot(a)) - slotRank(soonestSlot(b));
    if (slotDiff !== 0) return slotDiff;
    return b.yearsInPractice - a.yearsInPractice;
  });

  const stateName = STATES.find((s) => s.code === state)?.name ?? state;
  const matches: Match[] = ranked.slice(0, 3).map((clinician) => {
    const nextSlot = soonestSlot(clinician);
    const reasons: MatchReason[] = [
      {
        label: "Licensed in your state",
        detail: `Holds an active ${stateName} license (${clinician.licensedIn.join(", ")}).`,
      },
      {
        label: "In-network with your plan",
        detail:
          copay !== null
            ? `Contracted with ${payerName}${planName ? ` · ${planName}` : ""} — your $${copay} copay applies.`
            : `Contracted with ${payerName}${planName ? ` · ${planName}` : ""}.`,
      },
      {
        label: clinician.conditions.includes(condition)
          ? "Treats what you screened for"
          : "Adjacent specialty",
        detail: clinician.conditions.includes(condition)
          ? `Treats ${condition.toLowerCase()} — matches your screening result.`
          : `Treats ${clinician.conditions.join(", ").toLowerCase()}. Closest available fit in your network.`,
      },
      {
        label: "Has an opening",
        detail: `Next available: ${nextSlot}.`,
      },
    ];
    return { clinician, reasons, nextSlot };
  });

  return {
    matches,
    funnel: {
      total: CLINICIANS.length,
      licensed: licensed.length,
      inNetwork: inNetwork.length,
      treatsCondition: treats.length,
    },
    relaxedCondition,
  };
}
