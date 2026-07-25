import Link from "next/link";

/**
 * Shown whenever PHQ-9 item 9 scores above zero. This replaces the rest of the funnel —
 * it never renders alongside a booking control, and downstream screens redirect here
 * rather than rendering anything bookable.
 */
export function CrisisInterrupt({
  reason = "Because of how you answered one of the questions, we've stopped the intake here.",
}: {
  reason?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14" data-testid="crisis-interrupt">
      <div className="rounded-card border-2 border-danger/30 bg-danger-soft p-7 sm:p-9">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-danger">
          Intake stopped
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold leading-tight">
          Let&apos;s get you to a person, not a form.
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink">
          {reason} You told us you&apos;ve had thoughts of being better off dead
          or of hurting yourself. That deserves a real conversation right now —
          not a waitlist and not an appointment three weeks out.
        </p>

        <div className="mt-7 space-y-3">
          <a
            href="tel:988"
            className="flex items-center justify-between gap-4 rounded-card bg-danger px-6 py-5 text-white transition-opacity hover:opacity-90"
          >
            <span>
              <span className="block text-lg font-semibold">
                Call or text 988
              </span>
              <span className="block text-sm text-white/80">
                Suicide &amp; Crisis Lifeline — free, confidential, 24/7
              </span>
            </span>
            <span aria-hidden className="text-2xl">
              →
            </span>
          </a>
          <a
            href="sms:741741?&body=HOME"
            className="flex items-center justify-between gap-4 rounded-card border border-danger/25 bg-surface px-6 py-5 transition-colors hover:bg-danger-soft"
          >
            <span>
              <span className="block text-lg font-semibold">
                Text HOME to 741741
              </span>
              <span className="block text-sm text-ink-soft">
                Crisis Text Line — if talking out loud feels like too much
              </span>
            </span>
            <span aria-hidden className="text-2xl text-danger">
              →
            </span>
          </a>
          <a
            href="tel:911"
            className="flex items-center justify-between gap-4 rounded-card border border-danger/25 bg-surface px-6 py-5 transition-colors hover:bg-danger-soft"
          >
            <span>
              <span className="block text-lg font-semibold">Call 911</span>
              <span className="block text-sm text-ink-soft">
                If you or someone else is in immediate danger
              </span>
            </span>
            <span aria-hidden className="text-2xl text-danger">
              →
            </span>
          </a>
        </div>

        <p className="mt-7 text-[15px] leading-relaxed text-ink-soft">
          We are not going to show you a booking button on this screen. Matching
          you with an appointment is the wrong response to what you just told
          us, and pretending otherwise would be worse than doing nothing.
        </p>
      </div>

      <div className="mt-7 rounded-card border border-line bg-surface p-6">
        <h2 className="text-base font-semibold">
          Once you&apos;ve talked to someone
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Ongoing psychiatric care is still worth pursuing — it just needs to
          start with a human being, and often with a clinician who can see you
          urgently rather than at the next open slot. Your primary care doctor,
          your insurer&apos;s 24/7 nurse line (on the back of your card), or a
          988 counselor can all connect you to same-week care.
        </p>
        <Link
          href="/crisis"
          className="mt-4 inline-flex text-sm font-medium text-danger underline underline-offset-4"
        >
          See all crisis resources
        </Link>
      </div>
    </div>
  );
}
