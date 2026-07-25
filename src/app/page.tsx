import Link from "next/link";

const metrics = [
  {
    figure: "100+",
    label: "insurers we can query",
    note: "Payers reachable for real-time eligibility through our clearinghouse connection.",
  },
  {
    figure: "~170M",
    label: "covered lives in reach",
    note: "Combined enrollment across those payers. That is the population whose benefits we can actually verify.",
  },
  {
    figure: "90 sec",
    label: "to a real number",
    note: "Landing on the site to knowing your copay. No account, no email, no card.",
  },
  {
    figure: "0",
    label: "prescriptions written",
    note: "Covera has no prescribing surface at all. We think that is the whole point.",
  },
];

const steps = [
  {
    n: "01",
    t: "Coverage, before anything else",
    d: "You pick your state and your plan. We fire a real X12 270 eligibility request at the payer and read the mental-health copay straight out of their response. Whatever number comes back is the number we show you.",
  },
  {
    n: "02",
    t: "Screening that gets scored",
    d: "PHQ-9 and GAD-7. Same instruments a psychiatrist hands you on a clipboard, scored against the published severity bands. You see your own scores, which is rarer than it should be.",
  },
  {
    n: "03",
    t: "A shortlist you can argue with",
    d: "Three psychiatrists, and next to each one the four checks it passed: state licence, your plan, your presenting concern, an actual open slot. If you disagree with a match you can see exactly which check you disagree with.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1100px] px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sage">
          Insurance-first psychiatry
        </p>
        <h1 className="font-display mt-5 max-w-4xl text-[2.6rem] font-semibold leading-[1.04] sm:text-[3.6rem] lg:text-[4rem]">
          Most psychiatrists stopped taking insurance. The reason is boring, and
          fixable.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          Psychiatry has the lowest insurance-acceptance rate of any medical
          specialty. It isn&apos;t greed. Verifying benefits, chasing intake
          forms, and rebuilding a history the patient already told somebody else
          costs more per visit than the network rate pays back. So the rational
          move is to go cash-pay, and thousands of clinicians have.
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          Covera does that administrative work up front, for both sides of the
          appointment.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/coverage"
            className="rounded-card bg-brand px-8 py-4 text-center text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-hover"
          >
            Check my coverage
          </Link>
          <Link
            href="/for-clinicians"
            className="rounded-card border border-line bg-surface px-8 py-4 text-center text-base font-medium transition-colors hover:bg-brand-soft"
          >
            I&apos;m a clinician
          </Link>
        </div>
        <p className="mt-4 text-sm text-ink-faint">
          About 90 seconds. No account, no card, no email.
        </p>

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

      {/* Two sides */}
      <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sage">
          Both sides of the appointment
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.12] sm:text-[2.6rem]">
          Directories help you find whoever is still in network. We work on how
          many are still in network.
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-7 shadow-soft sm:p-9">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brand">
              For patients
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold">
              You find out about the money first
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Everywhere else you make an account, answer twenty questions,
              upload a photo of your card, and somewhere around minute eighteen
              you learn nobody takes your plan. That ordering is not an
              accident. The questions come first because the questions are how
              they keep you.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              We put the eligibility check on screen one. It costs you nothing,
              and if the answer is bad you get it in ninety seconds instead of
              twenty minutes.
            </p>
            <Link
              href="/coverage"
              className="mt-5 inline-flex text-[15px] font-medium text-brand underline underline-offset-4"
            >
              Check your coverage
            </Link>
          </div>

          <div className="rounded-card border border-line bg-surface p-7 shadow-soft sm:p-9">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-accent">
              For clinicians
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold">
              The intake arrives already done
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Ask a psychiatrist why they left insurance and you will hear about
              paperwork long before you hear about rates. Every covered visit
              carries a tail of verification, forms, and re-documentation, and
              that tail is what makes the network rate not worth it.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              The intake a patient finishes here lands on the clinician side as
              a pre-visit note. Eligibility already verified, screeners already
              scored, the items they endorsed most already pulled out. Make
              accepting insurance cheaper and the in-network pool stops
              shrinking.
            </p>
            <Link
              href="/for-clinicians"
              className="mt-5 inline-flex text-[15px] font-medium text-brand underline underline-offset-4"
            >
              How it works for clinicians
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
          Two places we deliberately refuse to convert you.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Everyone who blew up in this category blew up by converting harder. We
          wrote the opposite constraint into the software, where a policy
          document cannot quietly get revised at 2am.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-7 shadow-soft sm:p-9">
            <h3 className="font-display text-2xl font-semibold">
              We stop the funnel for anyone at risk
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Answer above zero on the self-harm item and the intake ends there.
              No booking button renders. The matching screen refuses to load,
              including if you type the URL in directly. Crisis resources take
              the whole page instead.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Somebody in that position needs a person on the phone tonight, not
              a calendar invite for the 14th.
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
              There is no prescribing surface in this product. Screening and
              matching, and that is the entire scope. The telepsychiatry
              companies that collapsed all collapsed on prescribing volume,
              because once scripts are the revenue line every incentive in the
              building bends toward writing more of them.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              What to prescribe is the psychiatrist&apos;s call, in the room,
              after they have met you. Our job ends at getting you into that
              room covered.
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
            you hand us anything.
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
