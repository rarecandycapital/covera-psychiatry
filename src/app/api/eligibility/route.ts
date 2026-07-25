import { NextResponse } from "next/server";
import cachedAetna271 from "@/lib/fixtures/stedi-271-aetna.json";
import { parseEligibility, type Stedi271 } from "@/lib/eligibility";
import { findPayer } from "@/lib/payers";

const STEDI_URL =
  "https://healthcare.us.stedi.com/2024-04-01/change/medicalnetwork/eligibility/v3";

// Any NPI that passes check-digit validation works against the sandbox.
const DEMO_PROVIDER = {
  organizationName: "Covera Behavioral Health",
  npi: "1999999984",
};

export async function POST(request: Request) {
  let payerId: string;
  let memberId: string;
  let dateOfBirth: string;
  let firstName: string;
  let lastName: string;

  try {
    const body = await request.json();
    payerId = String(body.payerId ?? "");
    memberId = String(body.memberId ?? "").trim();
    dateOfBirth = String(body.dateOfBirth ?? "").replace(/\D/g, "");
    firstName = String(body.firstName ?? "").trim();
    lastName = String(body.lastName ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payer = findPayer(payerId);
  if (!payer) {
    return NextResponse.json({ error: "Unknown payer." }, { status: 400 });
  }

  const apiKey = process.env.STEDI_API_KEY;

  // Graceful fallback: a cached real 271 from the Stedi sandbox. Used when the key is
  // missing, the network fails, or the payer errors — so the demo never dead-ends.
  const fallback = () => {
    const parsed = parseEligibility(cachedAetna271 as Stedi271);
    return NextResponse.json({
      source: "cached" as const,
      payerName: payer.name,
      ...parsed,
      planName: parsed.planName ?? payer.planName,
    });
  };

  if (!apiKey) {
    return fallback();
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    const stediResponse = await fetch(STEDI_URL, {
      method: "POST",
      headers: {
        Authorization: `Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tradingPartnerServiceId: payer.tradingPartnerServiceId,
        provider: DEMO_PROVIDER,
        subscriber: { firstName, lastName, dateOfBirth, memberId },
        encounter: { serviceTypeCodes: ["30"] },
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!stediResponse.ok) {
      return fallback();
    }

    const data = (await stediResponse.json()) as Stedi271;

    // A 200 with an AAA error array means the payer rejected the lookup — that is a
    // real answer, not a crash, so report it rather than falling back.
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return NextResponse.json({
        source: "live" as const,
        payerName: payer.name,
        planName: payer.planName,
        active: false,
        insuranceType: null,
        copay: null,
        coinsurance: null,
        deductibleRemaining: null,
        evidence: ["The payer could not verify this member with the details given."],
      });
    }

    const parsed = parseEligibility(data);
    return NextResponse.json({
      source: "live" as const,
      payerName: payer.name,
      ...parsed,
      planName: parsed.planName ?? payer.planName,
    });
  } catch {
    return fallback();
  }
}
