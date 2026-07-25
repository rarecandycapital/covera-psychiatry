"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readIntake, type Intake } from "@/lib/intake";
import { GAD7_ITEMS, PHQ9_ITEMS } from "@/lib/screener";
import { STATES } from "@/lib/payers";

// The second user. Everything on this screen is derived from the intake the patient
// already completed — the point is that nobody retypes it.

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-0.5 py-1.5">
      <span className="w-40 shrink-0 text-[13px] text-ink-soft">{label}</span>
      <span className="text-[14px] font-medium">{value}</span>
    </div>
  );
}

export default function ClinicianPage() {
  const [intake, setIntake] = useState<Intake | null>(null);

  useEffect(() => {
    setIntake(readIntake());
  }, []);

  if (intake === null) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-ink-faint">Loading…</div>
    );
  }

  const { coverage, screener, booking } = intake;

  if (!coverage || !screener) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20">
        <h1 className="font-display text-2xl font-semibold">
          No intake to display
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">
          This screen shows the clinician&apos;s view of a completed intake. Walk
          the patient flow first and come back.
        </p>
        <Link
          href="/coverage"
          className="mt-7 inline-flex rounded-card bg-brand px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-hover"
        >
          Start the coverage check
        </Link>
      </div>
    );
  }

  const stateName =
    STATES.find((s) => s.code === coverage.state)?.name ?? coverage.state;
  const patient = `${coverage.firstName} ${coverage.lastName}`;

  const topPhq9 = PHQ9_ITEMS.map((item, i) => ({ item, score: screener.phq9[i] }))
    .filter((x) => x.score >= 2)
    .slice(0, 4);
  const topGad7 = GAD7_ITEMS.map((item, i) => ({ item, score: screener.gad7[i] }))
    .filter((x) => x.score >= 2)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
          Clinician view
        </p>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-[12px] font-semibold text-accent">
          Read-only · static demo
        </span>
      </div>
      <h1 className="font-display mt-3 text-3xl font-semibold">
        Pre-visit note — already written
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
        Everything below was generated from the intake the patient just
        completed. Nobody retyped any of it.
      </p>

      <div className="mt-8 overflow-hidden rounded-card border border-line bg-surface">
        <div className="border-b border-line bg-bg px-6 py-4">
          <p className="font-mono text-[12px] uppercase tracking-wider text-ink-soft">
            Intake summary · generated automatically
          </p>
        </div>

        <div className="space-y-7 p-6 sm:p-7">
          <section>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
              Patient &amp; coverage
            </h2>
            <div className="mt-2 divide-y divide-line">
              <Row label="Patient" value={patient} />
              <Row label="Date of birth" value={coverage.dateOfBirth} />
              <Row label="State" value={stateName} />
              <Row
                label="Payer"
                value={`${coverage.payerName}${coverage.planName ? ` · ${coverage.planName}` : ""}`}
              />
              <Row label="Member ID" value={coverage.memberId} />
              <Row
                label="Eligibility"
                value={
                  coverage.active
                    ? `Active — verified ${coverage.source === "live" ? "live" : "from cache"} via X12 271`
                    : "Not active"
                }
              />
              <Row
                label="Patient responsibility"
                value={
                  coverage.copay !== null
                    ? `$${coverage.copay} copay${coverage.deductibleRemaining !== null ? ` · $${coverage.deductibleRemaining} deductible remaining` : ""}`
                    : "Not returned by payer"
                }
              />
            </div>
          </section>

          <section>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
              Screening
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-card border border-line p-4">
                <p className="text-[13px] text-ink-soft">PHQ-9</p>
                <p className="mt-0.5 text-xl font-semibold tabular-nums">
                  {screener.phq9Score}/27 ·{" "}
                  <span className="text-base font-medium">
                    {screener.phq9Severity}
                  </span>
                </p>
              </div>
              <div className="rounded-card border border-line p-4">
                <p className="text-[13px] text-ink-soft">GAD-7</p>
                <p className="mt-0.5 text-xl font-semibold tabular-nums">
                  {screener.gad7Score}/21 ·{" "}
                  <span className="text-base font-medium">
                    {screener.gad7Severity}
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              Item 9 (thoughts of death or self-harm) scored{" "}
              <span className="font-semibold text-ink">
                {screener.phq9[8]} — {screener.riskFlag ? "positive" : "negative"}
              </span>
              . {screener.riskFlag
                ? "Intake was halted and crisis resources were shown; no appointment was offered."
                : "No safety interrupt triggered."}
            </p>
          </section>

          {(topPhq9.length > 0 || topGad7.length > 0) && (
            <section>
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
                Most-endorsed items
              </h2>
              <ul className="mt-2 space-y-1.5">
                {[...topPhq9, ...topGad7].map((x) => (
                  <li key={x.item} className="flex gap-3 text-[14px]">
                    <span className="font-mono text-ink-faint">{x.score}</span>
                    <span className="leading-relaxed text-ink-soft">
                      {x.item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
              Impression &amp; plan
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed">
              {patient} is a {stateName} resident presenting with{" "}
              {screener.presentingCondition.toLowerCase()}, screening{" "}
              {screener.phq9Severity.toLowerCase()} on PHQ-9 and{" "}
              {screener.gad7Severity.toLowerCase()} on GAD-7. Coverage was
              verified before intake; benefits are active with a{" "}
              {coverage.copay !== null ? `$${coverage.copay} copay` : "plan-level"}{" "}
              patient responsibility.
              {booking
                ? ` Scheduled with Dr. ${booking.clinicianName}, ${booking.credential} for ${booking.slot}.`
                : ""}
            </p>
            <p className="mt-3 rounded-card border border-line bg-bg px-4 py-3 text-[14px] leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Scope note:</span> Covera
              performs screening and clinician matching only. No medication is
              recommended, prescribed, or refilled anywhere in this product —
              that decision belongs entirely to the treating psychiatrist.
            </p>
          </section>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/confirmation"
          className="rounded-card border border-line bg-surface px-6 py-3 text-[15px] font-medium transition-colors hover:bg-brand-soft"
        >
          Back to patient view
        </Link>
        <Link
          href="/"
          className="rounded-card border border-line bg-surface px-6 py-3 text-[15px] font-medium transition-colors hover:bg-brand-soft"
        >
          Start over
        </Link>
      </div>

      <p className="mt-8 text-center text-sm text-ink-faint">
        Fictional patient, fictional clinician, prototype note. Not a medical
        record.
      </p>
    </div>
  );
}
