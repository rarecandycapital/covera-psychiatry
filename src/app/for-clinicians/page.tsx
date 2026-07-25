import Link from "next/link";
import { Figure } from "@/components/Figure";

const burden = [
  {
    t: "Benefit verification",
    d: "Someone in your office calls the payer or logs into six different portals. We run the 270 before the patient ever books, and the copay is on the chart when you open it.",
  },
  {
    t: "Intake paperwork",
    d: "Forms emailed, forms not returned, forms returned blank. The screeners are completed as part of booking, or the booking does not happen.",
  },
  {
    t: "Re-taking the history",
    d: "The first fifteen minutes of a fifty minute visit, spent on questions the patient already answered. You get the scores, the bands, and the items they endorsed hardest, before they sit down.",
  },
];

export default function ForCliniciansPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1100px] px-5 pb-14 pt-14 sm:px-8 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-accent">
              For clinicians
            </p>
            <h1 className="font-display mt-5 text-[2.4rem] font-semibold leading-[1.06] sm:text-[3.1rem]">
              You did not leave insurance over the rates. You left over
              everything attached to the rates.
            </h1>
          </div>
          <p className="text-[17px] leading-relaxed text-ink-soft">
            The delta between a network rate and your cash rate is real, but it
            is rarely the thing that decides it. What decides it is the unbilled
            half-hour per patient: verification, forms, follow-up, documentation
            rebuilt from scratch. Covera is built to take that half-hour back.
          </p>
        </div>

        <Figure
          src="/images/clinician-office.webp"
          alt="A psychiatrist reading from a tablet in a quiet office"
          ratio="4 / 3"
          priority
          className="mt-12 shadow-soft"
        />
      </section>

      <section className="border-y border-line bg-bg-warm">
        <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
          <h2 className="font-display max-w-2xl text-[1.9rem] font-semibold leading-[1.12] sm:text-[2.4rem]">
            Three costs, moved off your desk
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {burden.map((b) => (
              <div
                key={b.t}
                className="rounded-card border border-line bg-surface p-7 shadow-soft"
              >
                <h3 className="font-display text-xl font-semibold">{b.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {b.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-[1.9rem] font-semibold leading-[1.12] sm:text-[2.4rem]">
              What lands on your side
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
              A single pre-visit note. Patient and plan at the top, eligibility
              status with the payer&apos;s own copay and deductible figures,
              PHQ-9 and GAD-7 with severity bands, and the specific items the
              patient scored hardest on. Then a short impression paragraph you
              can rewrite in thirty seconds or ignore entirely.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              The safety item is called out explicitly, every time, including
              when it is negative. You should never have to go hunting for it.
            </p>
            <Link
              href="/clinician"
              className="mt-7 inline-flex rounded-card bg-brand px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-hover"
            >
              See a sample note
            </Link>
          </div>

          <div className="rounded-card border border-line bg-surface p-7 shadow-soft">
            <h3 className="font-display text-xl font-semibold">
              What we will not send you
            </h3>
            <ul className="mt-5 space-y-4">
              {[
                {
                  t: "Anyone flagged at risk",
                  d: "A positive self-harm item ends the intake at our end. They are routed to 988 and crisis services, not onto your calendar.",
                },
                {
                  t: "Medication requests",
                  d: "There is no prescribing surface in the product, so nobody arrives having been promised a script by an algorithm.",
                },
                {
                  t: "Unverified coverage",
                  d: "If the payer did not return active benefits, the patient does not reach a booking screen.",
                },
              ].map((x) => (
                <li key={x.t} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>
                    <span className="text-[15px] font-semibold">{x.t}</span>
                    <span className="mt-1 block text-[14.5px] leading-relaxed text-ink-soft">
                      {x.d}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 pb-8 sm:px-8">
        <div className="rounded-card border border-line bg-surface px-7 py-12 shadow-soft sm:px-10">
          <h2 className="font-display max-w-2xl text-[1.9rem] font-semibold leading-[1.12]">
            This is a prototype, and we would rather say so.
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
            Covera was built at a hackathon. The eligibility integration is
            real and runs against a live clearinghouse sandbox. The twelve
            psychiatrists in the network are invented, no appointment is
            actually scheduled, and no clinician has been contacted. Walk the
            patient flow and you will see exactly how much of it is working
            software.
          </p>
          <Link
            href="/coverage"
            className="mt-7 inline-flex rounded-card border border-line px-7 py-3.5 text-base font-medium transition-colors hover:bg-brand-soft"
          >
            Walk the patient flow
          </Link>
        </div>
      </section>
    </div>
  );
}
