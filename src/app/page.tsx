import Link from "next/link";

const metrics = [
  {
    figure: "100+",
    label: "insurers reachable",
    note: "Payers we can query for real-time eligibility through our clearinghouse connection.",
  },
  {
    figure: "~170M",
    label: "covered lives in network reach",
    note: "Combined enrollment across those payers — the population whose coverage we can verify.",
  },
  {
    figure: "90 sec",
    label: "to a verified answer",
    note: "From landing on the site to knowing your copay. No account, no email, no card.",
  },
  {
    figure: "0",
    label: "prescriptions written",
    note: "There is no prescribing surface in this product. That is the strategy, not a gap.",
  },
];

const steps = [
  {
    n: "01",
    t: "Coverage, before anything else",
    d: "State, plan, member ID. We send a real X12 270 eligibility request to the payer and return the actual mental-health copay from their response — not an estimate, not a range.",
  },
  {
    n: "02",
    t: "Screening that gets scored",
    d: "PHQ-9 and GAD-7, the same instruments a psychiatrist would hand you on paper. Scored against published severity bands, and shown to you rather than hidden behind a portal login.",
  },
  {
    n: "03",
    t: "A match you can audit",
    d: "Three psychiatrists licensed in your state, contracted with your specific plan, treating what you screened for. Every card shows the four checks it passed. No relevance score.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1100px] px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sage">
          The intake layer for in-network psychiatry
        </p>
        <h1 className="font-display mt-5 max-w-4xl text-[2.6rem] font-semibold leading-[1.04] sm:text-[3.6rem] lg:text-[4rem]">
          Psychiatry is the least in-network specialty in American medicine.
          We&apos;re fixing the reason why.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          Not because there aren&apos;t enough psychiatrists — because taking
          insurance costs them more than it pays. Covera removes that cost on
          both sides: patients see their copay before they sign up, and
          clinicians receive an intake that&apos;s already verified, scored, and
          written.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/coverage"
            className="rounded-card bg-brand px-8 py-4 text-center text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-hover"
          >
            Check my coverage
          </Link>
          <span className="text-sm text-ink-faint">
            Takes about 90 seconds · No account, no card, no email
          </span>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2.5 text-[13.5px] text-ink-soft">
          {[
            "Real-time payer eligibility",
            "Validated clinical screeners",
            "Crisis interrupt built in",
            "No prescribing, ever",
          ].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span
                aria-hidden
                className="grid h-4 w-4 place-items-center rounded-full bg-brand-soft text-[9px] font-bold text-brand"
              >
                ✓
              </span>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-line bg-bg-warm">
        <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-[2.6rem] font-semibold leading-none text-brand">
                  {m.figure}
                </p>
                <p className="mt-2.5 text-[15px] font-semibold">{m.label}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
                  {m.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The two-sided argument */}
      <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sage">
          Two problems, not one
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.12] sm:text-[2.6rem]">
          A directory matches you to whoever is left. We change how many are
          left.
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-7 shadow-soft sm:p-9">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brand">
              Demand side
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold">
              Patients find out about money first
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Every competitor makes you create an account and answer twenty
              questions before revealing that nobody takes your plan. It is the
              single most demoralizing moment in mental health care, and it is
              engineered — the questions come first because the questions are
              how they keep you.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              We inverted it. The eligibility check is the first screen, it
              costs you nothing, and if the answer is bad you find out in ninety
              seconds instead of twenty minutes.
            </p>
          </div>

          <div className="rounded-card border border-line bg-surface p-7 shadow-soft sm:p-9">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-accent">
              Supply side
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold">
              Clinicians get an intake that&apos;s already done
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Psychiatrists drop insurance because the administrative cost of a
              covered visit — verifying benefits, chasing intake forms,
              rebuilding a history that the patient already told someone else —
              exceeds the reimbursement difference. Matching patients faster
              does nothing about that.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              The same intake the patient completes arrives as a finished
              pre-visit note: eligibility verified, scores banded, most-endorsed
              items surfaced. Lower the cost of accepting insurance and the
              in-network pool stops shrinking.
            </p>
            <Link
              href="/clinician"
              className="mt-5 inline-flex text-[15px] font-medium text-brand underline underline-offset-4"
            >
              See the clinician view
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-bg-warm">
        <div className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8">
          <h2 className="font-display max-w-2xl text-[2rem] font-semibold leading-[1.12] sm:text-[2.6rem]">
            Ninety seconds, three screens
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-card border border-line bg-surface p-7 shadow-soft"
              >
                <p className="font-display text-[13px] font-semibold text-sage">
                  {s.n}
                </p>
                <h3 className="font-display mt-3 text-xl font-semibold leading-snug">
                  {s.t}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why restraint */}
      <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sage">
          Why restraint
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.12] sm:text-[2.6rem]">
          The two places we deliberately refuse to convert.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Every company that collapsed in this category collapsed by converting
          harder. We built the opposite constraint into the product, where a
          policy document cannot quietly be revised away.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-7 shadow-soft sm:p-9">
            <h3 className="font-display text-2xl font-semibold">
              We stop the funnel for anyone at risk
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              If the screening indicates thoughts of self-harm, the intake ends.
              No booking button renders, the matching screen refuses to load,
              and crisis resources take the page — including for anyone who
              types the URL directly. Someone in crisis needs a person on the
              phone now, not an appointment three weeks out.
            </p>
            <Link
              href="/crisis"
              className="mt-5 inline-flex rounded-card border border-danger/20 bg-danger-soft px-5 py-2.5 text-[14px] font-medium text-danger transition-colors hover:bg-danger/10"
            >
              Crisis resources
            </Link>
          </div>

          <div className="rounded-card border border-line bg-surface p-7 shadow-soft sm:p-9">
            <h3 className="font-display text-2xl font-semibold">
              We do not prescribe anything
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              There is no prescribing surface anywhere in this product —
              screening and clinician matching only. The telepsychiatry
              companies that imploded did it on prescribing volume, because
              once prescriptions are the revenue line, every incentive bends
              toward writing more of them.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Treatment decisions belong to the psychiatrist you are matched
              with, in the room, after they have met you. We are the layer that
              gets you into that room covered.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-[1100px] px-5 pb-8 sm:px-8">
        <div className="rounded-card bg-brand px-7 py-12 text-center shadow-soft sm:px-10 sm:py-16">
          <h2 className="font-display mx-auto max-w-2xl text-[2rem] font-semibold leading-[1.12] text-white sm:text-[2.6rem]">
            Find out what psychiatry actually costs you.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/75">
            One screen, one real eligibility check, one honest number. Before
            you give us anything.
          </p>
          <Link
            href="/coverage"
            className="mt-9 inline-flex rounded-card bg-white px-8 py-4 text-base font-medium text-brand transition-opacity hover:opacity-90"
          >
            Check my coverage
          </Link>
        </div>
      </section>
    </div>
  );
}
