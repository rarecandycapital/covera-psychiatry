import Link from "next/link";
import { Figure } from "@/components/Figure";
import { Container, Grid, Section } from "@/components/Grid";

const burden = [
  {
    n: "01",
    t: "Benefit verification",
    d: "Someone in the office calls the payer, or logs into whichever portal that payer uses. We run the 270 before the patient books, so the copay is already on the chart when you open it.",
  },
  {
    n: "02",
    t: "Intake paperwork",
    d: "Forms emailed, forms not returned, forms returned half-finished. Here the screeners are part of booking. If they aren't completed, the appointment isn't made.",
  },
  {
    n: "03",
    t: "Re-taking the history",
    d: "Fifteen minutes of a fifty minute visit spent on questions the patient has already answered once. You get the scores, the bands and the items they endorsed hardest before they sit down.",
  },
];

const notSending = [
  {
    t: "Anyone flagged at risk",
    d: "A positive self-harm item ends the intake at our end. They go to 988 and crisis services rather than onto your calendar.",
  },
  {
    t: "Medication requests",
    d: "There is no prescribing feature in the product, so nobody arrives having been promised a script by software.",
  },
  {
    t: "Unverified coverage",
    d: "If the payer did not return active benefits, the patient never reaches a booking screen.",
  },
];

export default function ForCliniciansPage() {
  return (
    <div>
      <Container>
        <Grid className="pb-16 pt-16 sm:pb-24 sm:pt-24">
          <div className="col-span-12 lg:col-span-2">
            <p className="label-mono text-ink-faint">
              00<span className="mx-2 text-line">/</span>Clinicians
            </p>
          </div>
          <div className="col-span-12 mt-8 lg:col-span-10 lg:mt-0">
            <h1 className="font-display display-hero max-w-[18ch]">
              The rates aren&apos;t really why psychiatrists drop insurance.
            </h1>
          </div>
          <div className="col-span-12 mt-12 lg:col-start-3 lg:col-end-9">
            <p className="text-[17px] leading-relaxed text-ink-soft">
              The gap between a network rate and a cash rate is real, but it is
              rarely the deciding factor on its own. What decides it is the
              unbilled half-hour per patient: verification, forms, follow-up,
              and documentation rebuilt from scratch. Covera is built to take
              that half-hour back.
            </p>
          </div>
        </Grid>

        <Figure
          src="/images/clinician-office.webp"
          alt="A psychiatrist reading from a tablet in a quiet office"
          ratio="4 / 3"
          priority
          className="!rounded-none"
        />
      </Container>

      <Section number="01" label="The cost" className="mt-20 sm:mt-28">
        <h2 className="font-display display-section max-w-[16ch]">
          Three costs, moved off your desk.
        </h2>
        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
          {burden.map((b, i) => (
            <div
              key={b.t}
              className={`col-span-12 lg:col-span-4 ${
                i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""
              }`}
            >
              <p className="label-mono text-ink-faint">{b.n}</p>
              <h3 className="font-display mt-4 text-xl font-semibold">{b.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {b.d}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section number="02" label="The note">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-6 lg:pr-10">
            <h2 className="font-display display-section max-w-[12ch]">
              What lands on your side.
            </h2>
            <p className="mt-8 text-[16px] leading-relaxed text-ink-soft">
              One pre-visit note. Patient and plan at the top, eligibility
              status with the payer&apos;s own copay and deductible figures,
              PHQ-9 and GAD-7 with severity bands, and the specific items the
              patient scored hardest on. Below that, a short impression
              paragraph you can rewrite or ignore.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              The safety item is called out on every note, including when it is
              negative, so you are never scanning for it.
            </p>
            <Link
              href="/clinician"
              className="mt-8 inline-flex rounded-card bg-brand px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-hover"
            >
              See a sample note
            </Link>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:border-l lg:border-line lg:pl-10">
            <p className="label-mono text-ink-faint">
              What we will not send you
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {notSending.map((x) => (
                <li key={x.t} className="py-5">
                  <p className="text-[15px] font-semibold">{x.t}</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
                    {x.d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section number="03" label="Status">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display display-section max-w-[18ch]">
              This is a prototype, and we would rather say so.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[16px] leading-relaxed text-ink-soft">
              Covera was built at a hackathon. The eligibility integration is
              real and runs against a live clearinghouse sandbox. The twelve
              psychiatrists in the network are invented, no appointment is
              actually scheduled, and no clinician has been contacted. Walking
              the patient flow will show you which parts are working software.
            </p>
            <Link
              href="/coverage"
              className="mt-7 inline-flex rounded-card border border-ink/15 px-7 py-3.5 text-base font-medium transition-colors hover:bg-brand-soft"
            >
              Walk the patient flow
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
