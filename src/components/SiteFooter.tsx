import Link from "next/link";

// Honest capability badges — these describe what this build actually does. They are not
// certifications, and they must never be dressed up as any.
const badges = [
  { label: "PHQ-9 / GAD-7", sub: "Validated instruments" },
  { label: "X12 270/271", sub: "Real-time eligibility" },
  { label: "No prescribing", sub: "By design, not by gap" },
  { label: "988 routing", sub: "Crisis interrupt built in" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-bg-warm">
      <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-4">
          {badges.map((b) => (
            <div
              key={b.label}
              className="rounded-card border border-line bg-surface px-4 py-3.5"
            >
              <p className="font-display text-[15px] font-semibold text-brand">
                {b.label}
              </p>
              <p className="mt-0.5 text-[12.5px] text-ink-soft">{b.sub}</p>
            </div>
          ))}
        </div>

        <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-8 text-[13.5px] font-medium">
          <Link href="/" className="text-ink-soft hover:text-ink">
            Home
          </Link>
          <Link href="/coverage" className="text-ink-soft hover:text-ink">
            For patients
          </Link>
          <Link href="/for-clinicians" className="text-ink-soft hover:text-ink">
            For clinicians
          </Link>
          <Link href="/clinician" className="text-ink-soft hover:text-ink">
            Sample pre-visit note
          </Link>
          <Link href="/crisis" className="text-danger hover:opacity-80">
            Crisis resources
          </Link>
        </nav>

        <div className="mt-8 space-y-3 text-[13px] leading-relaxed text-ink-soft">
          <p className="font-medium text-ink">
            Hackathon prototype — not a medical service.
          </p>
          <p className="max-w-3xl">
            Covera is a demonstration build. It provides no medical advice, no
            diagnosis, and no treatment. No real appointments are booked, no
            real insurance claims are filed, and every clinician shown is
            fictional. Nothing here creates a patient–provider relationship.
          </p>
          <p className="text-ink">
            <span className="font-medium">If you are in crisis:</span> call or
            text{" "}
            <a
              href="tel:988"
              className="font-semibold text-danger underline underline-offset-2"
            >
              988
            </a>{" "}
            (Suicide &amp; Crisis Lifeline), text{" "}
            <span className="font-semibold">HOME to 741741</span>, or call{" "}
            <span className="font-semibold">911</span> for an emergency.{" "}
            <Link
              href="/crisis"
              className="font-medium text-danger underline underline-offset-2"
            >
              All crisis resources
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
