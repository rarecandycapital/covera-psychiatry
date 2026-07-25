"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CrisisInterrupt } from "@/components/CrisisInterrupt";
import { readIntake, writeIntake, type Intake } from "@/lib/intake";
import { matchClinicians } from "@/lib/match";
import { STATES } from "@/lib/payers";

export default function MatchPage() {
  const router = useRouter();
  const [intake, setIntake] = useState<Intake | null>(null);

  useEffect(() => {
    setIntake(readIntake());
  }, []);

  const result = useMemo(() => {
    if (!intake?.coverage || !intake.screener) return null;
    return matchClinicians({
      state: intake.coverage.state,
      payerId: intake.coverage.payerId,
      payerName: intake.coverage.payerName,
      planName: intake.coverage.planName,
      copay: intake.coverage.copay,
      condition: intake.screener.presentingCondition,
    });
  }, [intake]);

  if (intake === null) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-ink-faint">
        Loading your matches…
      </div>
    );
  }

  // Safety gate: a positive risk flag can never reach a bookable screen, including by
  // typing the URL directly.
  if (intake.screener?.riskFlag) {
    return <CrisisInterrupt />;
  }

  if (!intake.coverage || !intake.screener) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20">
        <h1 className="text-2xl font-semibold tracking-tight">
          We need a couple of things first
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">
          Matching depends on your coverage check and your screening results.
          Start at the beginning and it takes about ninety seconds.
        </p>
        <Link
          href="/coverage"
          className="mt-7 inline-flex rounded-full bg-brand px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-hover"
        >
          Start the coverage check
        </Link>
      </div>
    );
  }

  const { coverage, screener } = intake;
  const stateName =
    STATES.find((s) => s.code === coverage.state)?.name ?? coverage.state;

  if (!result || result.matches.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20">
        <h1 className="text-2xl font-semibold tracking-tight">
          No in-network match in {stateName}
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">
          Nobody in our network is both licensed in {stateName} and contracted
          with {coverage.payerName}. We would rather tell you that in ninety
          seconds than after an intake form.
        </p>
        <Link
          href="/coverage"
          className="mt-7 inline-flex rounded-full border border-line bg-surface px-7 py-3.5 text-base font-medium transition-colors hover:bg-brand-soft"
        >
          Try a different plan
        </Link>
      </div>
    );
  }

  function book(id: string, name: string, credential: string, slot: string) {
    writeIntake({
      booking: {
        clinicianId: id,
        clinicianName: name,
        credential,
        slot,
        copay: coverage.copay,
        bookedAt: new Date().toISOString(),
      },
    });
    router.push("/confirmation");
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
        Step 3 of 3
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Three psychiatrists who actually fit
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
        Not a relevance score. Each card shows the four things that had to be
        true, and you can check every one of them.
      </p>

      <div className="mt-7 rounded-2xl border border-line bg-surface p-6">
        <h2 className="text-base font-semibold">How we got to three</h2>
        <ol className="mt-4 space-y-3">
          {[
            {
              n: result.funnel.total,
              label: "psychiatrists in the network",
            },
            {
              n: result.funnel.licensed,
              label: `licensed in ${stateName}`,
            },
            {
              n: result.funnel.inNetwork,
              label: `in-network with ${coverage.payerName}`,
            },
            {
              n: result.funnel.treatsCondition,
              label: `treat ${screener.presentingCondition.toLowerCase()}`,
            },
          ].map((step) => (
            <li key={step.label} className="flex items-center gap-3.5">
              <span className="w-9 shrink-0 text-right text-xl font-semibold tabular-nums text-brand">
                {step.n}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg">
                <span
                  className="block h-full rounded-full bg-brand/70"
                  style={{
                    width: `${(step.n / Math.max(1, result.funnel.total)) * 100}%`,
                  }}
                />
              </span>
              <span className="w-[46%] shrink-0 text-[14px] text-ink-soft">
                {step.label}
              </span>
            </li>
          ))}
        </ol>
        {result.relaxedCondition && (
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-[14px] leading-relaxed text-ink">
            Fewer than three clinicians treat{" "}
            {screener.presentingCondition.toLowerCase()} in your network, so
            we&apos;ve included the closest adjacent fits and labelled them
            honestly below.
          </p>
        )}
      </div>

      <div className="mt-6 space-y-5">
        {result.matches.map(({ clinician, reasons, nextSlot }) => (
          <article
            key={clinician.id}
            className="rounded-2xl border border-line bg-surface p-6 sm:p-7"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  Dr. {clinician.name}, {clinician.credential}
                </h3>
                <p className="mt-1 text-[14px] text-ink-soft">
                  {clinician.yearsInPractice} years in practice ·{" "}
                  {clinician.conditions.join(", ")}
                </p>
              </div>
              {coverage.copay !== null && (
                <span className="rounded-full bg-ok-soft px-3.5 py-1.5 text-[13px] font-semibold text-ok">
                  ${coverage.copay} per visit
                </span>
              )}
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              {clinician.bio}
            </p>

            <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
              {reasons.map((r) => (
                <li key={r.label} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] font-bold text-brand"
                  >
                    ✓
                  </span>
                  <span className="text-[14px] leading-relaxed">
                    <span className="font-semibold">{r.label}.</span>{" "}
                    <span className="text-ink-soft">{r.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() =>
                book(
                  clinician.id,
                  clinician.name,
                  clinician.credential,
                  nextSlot,
                )
              }
              className="mt-6 w-full rounded-full bg-brand px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Book {nextSlot}
            </button>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink-faint">
        All twelve clinicians in this prototype are fictional. No real
        appointment is scheduled.
      </p>
    </div>
  );
}
