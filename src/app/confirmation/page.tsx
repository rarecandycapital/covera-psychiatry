"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CrisisInterrupt } from "@/components/CrisisInterrupt";
import { readIntake, type Intake } from "@/lib/intake";
import { STATES } from "@/lib/payers";

export default function ConfirmationPage() {
  const [intake, setIntake] = useState<Intake | null>(null);

  useEffect(() => {
    setIntake(readIntake());
  }, []);

  if (intake === null) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-ink-faint">Loading…</div>
    );
  }

  if (intake.screener?.riskFlag) {
    return <CrisisInterrupt />;
  }

  const { booking, coverage } = intake;

  if (!booking || !coverage) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20">
        <h1 className="font-display text-2xl font-semibold">
          Nothing booked yet
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-ink-soft">
          Start with the coverage check and you&apos;ll be here in about ninety
          seconds.
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

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <div className="rounded-card border border-ok/25 bg-ok-soft p-7 sm:p-9">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-full bg-ok text-sm font-bold text-white"
          >
            ✓
          </span>
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ok">
            Appointment held
          </span>
        </div>
        <h1 className="font-display mt-4 text-3xl font-semibold leading-tight">
          {booking.slot} with Dr. {booking.clinicianName},{" "}
          {booking.credential}.
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-ink">
          {booking.copay !== null ? (
            <>
              You&apos;ll owe <strong>${booking.copay}</strong> at the visit —
              the copay {coverage.payerName} returned for in-network outpatient
              mental health.
            </>
          ) : (
            <>
              {coverage.payerName} confirmed active coverage for outpatient
              mental health under {coverage.planName}.
            </>
          )}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          { label: "Clinician", value: `Dr. ${booking.clinicianName}, ${booking.credential}` },
          { label: "When", value: booking.slot },
          { label: "Plan", value: `${coverage.payerName}${coverage.planName ? ` · ${coverage.planName}` : ""}` },
          { label: "Licensed in", value: stateName },
        ].map((row) => (
          <div
            key={row.label}
            className="rounded-card border border-line bg-surface p-5"
          >
            <p className="text-[13px] text-ink-soft">{row.label}</p>
            <p className="mt-1 text-[16px] font-semibold">{row.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-card border border-line bg-surface p-6">
        <h2 className="text-base font-semibold">What happens next</h2>
        <ol className="mt-4 space-y-4">
          {[
            {
              t: "Your intake is already written up",
              d: "Your screening scores and coverage details are summarized into a clinical note before the visit. Your psychiatrist reads it beforehand instead of spending the first fifteen minutes retaking your history.",
            },
            {
              t: "You get a reminder the day before",
              d: "With the video link and what your plan says you'll owe. No surprise bill after the fact.",
            },
            {
              t: "The first visit is 50 minutes",
              d: "You and your clinician decide how often to meet after that.",
            },
          ].map((step, i) => (
            <li key={step.t} className="flex gap-3.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-soft text-[12px] font-bold text-brand">
                {i + 1}
              </span>
              <div>
                <p className="text-[15px] font-semibold">{step.t}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                  {step.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Link
        href="/clinician"
        className="mt-6 flex items-center justify-between gap-4 rounded-card border border-brand/25 bg-brand-soft px-6 py-5 transition-colors hover:bg-brand/10"
      >
        <span>
          <span className="block text-[15px] font-semibold">
            See what your psychiatrist receives
          </span>
          <span className="mt-0.5 block text-[14px] text-ink-soft">
            The same intake, already written up as a clinical note
          </span>
        </span>
        <span aria-hidden className="text-2xl text-brand">
          →
        </span>
      </Link>

      <p className="mt-8 text-center text-sm text-ink-faint">
        This is a hackathon prototype. No appointment has actually been
        scheduled and no clinician has been contacted.
      </p>
    </div>
  );
}
