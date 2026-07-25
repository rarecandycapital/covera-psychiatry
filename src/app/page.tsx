import Link from "next/link";
import { Figure } from "@/components/Figure";
import { Container, Grid, Section } from "@/components/Grid";
import { CountUp, Reveal } from "@/components/Motion";

const metrics = [
  {
    value: 100,
    suffix: "+",
    label: "insurers we can query",
    note: "Payers reachable for real-time eligibility through our clearinghouse connection.",
  },
  {
    value: 170,
    prefix: "~",
    suffix: "M",
    label: "covered lives in reach",
    note: "Combined enrollment across those payers — the population whose benefits we can verify.",
  },
  {
    value: 90,
    suffix: "s",
    label: "to a real number",
    note: "Landing on the site to knowing your copay. No account, no email, no card.",
  },
  {
    value: 0,
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
    d: "Three psychiatrists, each with the four conditions it met listed underneath: state licence, your plan, your presenting concern, an open appointment. The filtering counts are shown as well, so you can follow how twelve became three.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero — full-bleed photograph, copy sits over the left of the frame */}
      <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden sm:min-h-[86vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-patient.webp"
          alt="A woman at a kitchen table in morning light, checking her phone"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center]"
        />
        {/* Flat scrim, no gradient. Measured against the photograph: the copy
            column sits at ~13:1 contrast, the body text at ~7:1. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#20211d]/68" />

        <Container className="relative py-20">
          <Grid>
            <div className="col-span-12 lg:col-span-7">
              <p className="label-mono text-white/60">
                00<span className="mx-2 text-white/30">/</span>Insurance-first
                psychiatry
              </p>
              <h1 className="font-display display-hero mt-7 text-[#faf7f2]">
                Most psychiatrists don&apos;t take insurance. We check yours
                first, in about 90 seconds.
              </h1>
              <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-white/75">
                Psychiatry has the lowest insurance-acceptance rate of any
                medical specialty. The usual explanation is reimbursement, but
                the bigger cost is administrative — verifying benefits, chasing
                intake forms, re-documenting a history the patient already gave
                someone else.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/coverage"
                  className="rounded-card bg-brand px-8 py-4 text-center text-base font-medium text-white transition-colors hover:bg-brand-hover"
                >
                  Check my coverage
                </Link>
                <Link
                  href="/for-clinicians"
                  className="rounded-card border border-white/30 px-8 py-4 text-center text-base font-medium text-white transition-colors hover:bg-white/10"
                >
                  I&apos;m a clinician
                </Link>
              </div>
              <p className="label-mono mt-5 text-white/55">
                No account · No card · No email
              </p>
            </div>
          </Grid>
        </Container>
      </section>

      {/* Two doors — the only real fork on the site, so it gets full width */}
      <div className="grid grid-cols-1 border-t border-line md:grid-cols-2">
        <Link
          href="/coverage"
          className="group relative flex min-h-[240px] flex-col justify-between bg-brand px-6 py-10 text-white transition-colors hover:bg-brand-hover sm:px-10 sm:py-14"
        >
          <div>
            <p className="label-mono text-white/55">I need a psychiatrist</p>
            <h2 className="font-display mt-5 max-w-[14ch] text-[1.9rem] leading-[1.06] sm:text-[2.4rem]">
              <span className="underline-draw">Check my coverage</span>
            </h2>
          </div>
          <p className="mt-8 flex items-center gap-3 text-[15px] text-white/75">
            Real eligibility check, no account
            <span aria-hidden className="nudge text-xl">
              →
            </span>
          </p>
        </Link>

        <Link
          href="/for-clinicians"
          className="group relative flex min-h-[240px] flex-col justify-between border-t border-line bg-bg-warm px-6 py-10 transition-colors hover:bg-brand-soft md:border-l md:border-t-0 sm:px-10 sm:py-14"
        >
          <div>
            <p className="label-mono text-ink-faint">I am a clinician</p>
            <h2 className="font-display mt-5 max-w-[14ch] text-[1.9rem] leading-[1.06] sm:text-[2.4rem]">
              <span className="underline-draw">See what we send you</span>
            </h2>
          </div>
          <p className="mt-8 flex items-center gap-3 text-[15px] text-ink-soft">
            Verified, scored, already written up
            <span aria-hidden className="nudge text-xl text-brand">
              →
            </span>
          </p>
        </Link>
      </div>

      {/* Metrics */}
      <div className="border-t border-line">
        <Container>
          <Grid className="py-16">
            {metrics.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 90}
                className={`col-span-6 py-6 lg:col-span-3 lg:py-0 ${
                  i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""
                }`}
              >
                <p className="font-display display-metric text-brand">
                  <CountUp
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                  />
                </p>
                <p className="mt-3 text-[14px] font-semibold">{m.label}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                  {m.note}
                </p>
              </Reveal>
            ))}
          </Grid>
        </Container>
      </div>

      {/* Two sides */}
      <Section number="01" label="The problem">
        <Reveal>
          <h2 className="font-display display-section max-w-[16ch]">
            A better directory doesn&apos;t add a single in-network
            psychiatrist.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-6 lg:pr-10">
            <Figure
              src="/images/patient-hands.webp"
              alt="Hands holding a phone at a desk with an insurance card nearby"
              ratio="4 / 5"
              className="!rounded-none"
            />
            <p className="label-mono mt-6 text-brand">For patients</p>
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
              className="mt-5 inline-flex border-b border-brand/40 pb-0.5 text-[15px] font-medium text-brand"
            >
              Check your coverage
            </Link>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:border-l lg:border-line lg:pl-10">
            <Figure
              src="/images/clinician-desk.webp"
              alt="A clinician working at a laptop in a warm, quiet room"
              ratio="4 / 5"
              className="!rounded-none"
            />
            <p className="label-mono mt-6 text-ink-faint">For clinicians</p>
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
              className="mt-5 inline-flex border-b border-brand/40 pb-0.5 text-[15px] font-medium text-brand"
            >
              How it works for clinicians
            </Link>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section number="02" label="How it works">
        <h2 className="font-display display-section max-w-[14ch]">
          Ninety seconds, three screens.
        </h2>
        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 110}
              className={`col-span-12 lg:col-span-4 ${
                i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""
              }`}
            >
              <p className="label-mono text-ink-faint">{s.n}</p>
              <h3 className="font-display mt-4 text-xl font-semibold leading-snug">
                {s.t}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {s.d}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Container>
        <Figure
          src="/images/texture-fold.webp"
          alt=""
          ratio="2400 / 965"
          className="!rounded-none"
        />
      </Container>

      {/* Why restraint */}
      <Section number="03" label="Restraint">
        <h2 className="font-display display-section max-w-[18ch]">
          Two places we deliberately refuse to convert you.
        </h2>
        <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
          The companies that got into trouble in this category got there by
          converting harder. We put the limits in the code rather than in a
          policy document.
        </p>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-6 lg:pr-10">
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
              className="mt-6 inline-flex rounded-card border border-danger/25 px-5 py-2.5 text-[14px] font-medium text-danger transition-colors hover:bg-danger-soft"
            >
              Crisis resources
            </Link>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:border-l lg:border-line lg:pl-10">
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
      </Section>

      {/* Closing */}
      <div className="border-t border-line">
        <Container>
          <Grid className="py-24 sm:py-32">
            <div className="col-span-12 lg:col-span-2">
              <p className="label-mono text-ink-faint">
                04<span className="mx-2 text-line">/</span>Start
              </p>
            </div>
            <div className="col-span-12 mt-8 lg:col-span-7 lg:mt-0">
              <h2 className="font-display display-section max-w-[16ch]">
                Find out what psychiatry actually costs you.
              </h2>
              <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-ink-soft">
                Takes about ninety seconds and never asks you to make an
                account.
              </p>
            </div>
            <div className="col-span-12 mt-10 self-end lg:col-span-3 lg:mt-0">
              <Link
                href="/coverage"
                className="block rounded-card bg-brand px-8 py-4 text-center text-base font-medium text-white transition-colors hover:bg-brand-hover"
              >
                Check my coverage
              </Link>
            </div>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
