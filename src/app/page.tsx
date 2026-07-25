import Link from "next/link";

const steps = [
  {
    n: "01",
    t: "Coverage check",
    d: "State, plan, member ID. We run a real X12 270 eligibility request against your payer and come back with your actual mental-health copay.",
  },
  {
    n: "02",
    t: "Screening",
    d: "PHQ-9 and GAD-7 — the same instruments a psychiatrist would hand you — scored, with the severity bands shown to you, not hidden.",
  },
  {
    n: "03",
    t: "Match",
    d: "Three psychiatrists licensed in your state, contracted with your specific plan, who treat what you screened for, with real openings.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <section className="py-20 sm:py-24">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
          Insurance first
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-[3.4rem]">
          Find a psychiatrist who takes your insurance — in 90 seconds.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          Psychiatry is the least in-network specialty in American medicine.
          Everyone else makes you create an account and answer twenty questions
          before you find out nobody takes your plan. We check coverage first.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/coverage"
            className="rounded-full bg-brand px-8 py-4 text-base font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Check my coverage
          </Link>
          <span className="text-sm text-ink-faint">
            No account. No card. No email.
          </span>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          The funnel, inverted
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-mono text-[13px] font-semibold text-brand">
                {s.n}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              We deliberately do not prescribe.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              There is no prescribing surface anywhere in this product —
              screening and clinician matching only. Every telepsychiatry
              company that collapsed in this category collapsed on prescribing
              volume. Treatment decisions belong to the psychiatrist you get
              matched with, in the room, after they have actually met you.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Two users, not one.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              The intake a patient completes becomes the pre-visit note the
              psychiatrist reads. Nobody retypes a history, and the first
              fifteen minutes of the visit aren&apos;t spent reconstructing what
              the patient already told us.
            </p>
            <Link
              href="/clinician"
              className="mt-4 inline-flex text-[15px] font-medium text-brand underline underline-offset-4"
            >
              See the clinician view
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="rounded-3xl border border-line bg-surface p-7 sm:p-9">
          <h2 className="text-xl font-semibold tracking-tight">
            If you are in crisis, we stop.
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
            If the screening indicates thoughts of self-harm, the funnel ends
            there. No booking button, no waitlist, no appointment three weeks
            out — just crisis resources and a path to a person, immediately.
            It is not possible to click past it.
          </p>
          <Link
            href="/crisis"
            className="mt-5 inline-flex rounded-full border border-danger/25 bg-danger-soft px-6 py-3 text-[15px] font-medium text-danger transition-colors hover:bg-danger/10"
          >
            Crisis resources
          </Link>
        </div>
      </section>
    </div>
  );
}
