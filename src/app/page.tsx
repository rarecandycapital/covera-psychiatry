import Link from "next/link";
import { Figure } from "@/components/Figure";

const metrics = [
  {
    figure: "100+",
    label: "insurers we can query",
    note: "Payers reachable for real-time eligibility through our clearinghouse connection.",
  },
  {
    figure: "~170M",
    label: "covered lives in reach",
    note: "Combined enrollment across those payers — the population whose benefits we can verify.",
  },
  {
    figure: "90 sec",
    label: "to a real number",
    note: "Landing on the site to knowing your copay. No account, no email, no card.",
  },
  {
    figure: "0",
    label: "prescriptions written",
    note: "Covera has no prescribing feature. Screening and clinician matching only.",
  },
];

const steps = [
  {
    n: "01",
    t: "Coverage, before anything else",
    d: "You pick your state and your plan. We send an X12 270 eligibility request to the payer and read the mental-health copay out of the 271 that comes back. If the payer doesn't return a copay, we show that too.",
  },
  {
    n: "02",
    t: "Screening that gets scored",
    d: "PHQ-9 and GAD-7, the same instruments a psychiatrist would hand you on a clipboard. Scored against the published severity bands, and your scores appear on the next screen rather than going straight to a chart you can't see.",
  },
  {
    n: "03",
    t: "A shortlist you can check",
    d: "Three psychiatrists, each with the four checks it passed listed underneath: state licence, your plan, your presenting concern, an open appointment. The filtering counts are shown as well, so you can follow how twelve became three.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1100px] px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sage">
              Insurance-first psychiatry
            </p>
            <h1 className="font-display mt-5 text-[2.6rem] font-semibold leading-[1.04] sm:text-[3.4rem]">
              Most psychiatrists don&apos;t take insurance. We check yours
              first, in about 90 seconds.
            </h1>
          </div>
          <div>
            <p className="text-[17px] leading-relaxed text-ink-soft">
              Psychiatry has the lowest insurance-acceptance rate of any medical
              specialty. The usual explanation is reimbursement, but the bigger
              cost is administrative — verifying benefits, chasing intake forms,
              re-documenting a history the patient already gave someone else.
              For a lot of practices that work costs more than the network rate
              returns.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Covera moves that work to the front of the process, for the
              patient and for the clinician.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
          <span className="self-center text-sm text-ink-faint sm:ml-2">
            No account, no card, no email.
          </span>
        </div>

        <Figure
          src="/images/hero-patient.webp"
          alt="A woman at a kitchen table in morning light, checking her phone"
          ratio="3 / 2"
          priority
          className="mt-12 shadow-soft"
        />
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
          A better directory doesn&apos;t add a single in-network psychiatrist.
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-7 shadow-soft sm:p-9">
            <Figure
              src="/images/patient-hands.webp"
              alt="Hands holding a phone at a desk with an insurance card nearby"
              ratio="4 / 5"
              className="mb-7"
            />
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brand">
              For patients
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold">
              You find out about the money first
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Everywhere else you make an account, answer twenty questions,
              upload a photo of your card, and find out around minute eighteen
              that nobody takes your plan. The sequencing is a conversion
              tactic. Sunk cost is what makes people finish the form.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              We put the eligibility check on the first screen. It costs
              nothing, and a bad answer arrives in ninety seconds rather than
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
            <Figure
              src="/images/clinician-desk.webp"
              alt="A clinician working at a laptop in a warm, quiet room"
              ratio="4 / 5"
              className="mb-7"
            />
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-accent">
              For clinicians
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold">
              The intake arrives already done
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Ask a psychiatrist why they left insurance and paperwork usually
              comes up before rates do. Every covered visit carries
              verification, forms and re-documentation behind it, none of which
              is billable.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              The intake a patient completes here arrives on the clinician side
              as a pre-visit note: eligibility verified, screeners scored, the
              items they endorsed most pulled out. That covers most of the
              unbilled work before the visit starts.
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

      <div className="mx-auto max-w-[1100px] px-5 pt-16 sm:px-8">
        <Figure
          src="/images/texture-fold.webp"
          alt=""
          ratio="2400 / 965"
          className="!rounded-none"
        />
      </div>

      {/* Why restraint */}
      <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-sage">
          Why restraint
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.12] sm:text-[2.6rem]">
          Two places we deliberately refuse to convert you.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          The companies that got into trouble in this category got there by
          converting harder. We put the limits in the code rather than in a
          policy document.
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
              the whole page instead, and 988 is one tap.
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
              Covera has no prescribing feature — screening and clinician
              matching, nothing else. Several telepsychiatry companies built
              their revenue on prescription volume and ended up under federal
              investigation for it. We would rather not carry that pressure in
              the business at all.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Medication decisions belong to the psychiatrist you are matched
              with, after they have met you.
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
            Takes about ninety seconds and never asks you to make an account.
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
