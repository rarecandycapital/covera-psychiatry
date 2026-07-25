import Link from "next/link";

const resources = [
  {
    name: "988 Suicide & Crisis Lifeline",
    detail:
      "Free, confidential, 24/7. Call or text 988 to reach a trained counselor anywhere in the US.",
    action: "Call or text 988",
    href: "tel:988",
  },
  {
    name: "Crisis Text Line",
    detail:
      "Text HOME to 741741 to reach a trained crisis counselor by text message, 24/7.",
    action: "Text HOME to 741741",
    href: "sms:741741?&body=HOME",
  },
  {
    name: "Veterans Crisis Line",
    detail:
      "For veterans, service members, and their families. Call 988 and press 1, or text 838255.",
    action: "Call 988, press 1",
    href: "tel:988",
  },
  {
    name: "Emergency services",
    detail:
      "If you or someone else is in immediate physical danger, call 911 or go to your nearest emergency room.",
    action: "Call 911",
    href: "tel:911",
  },
];

export default function CrisisPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-3xl font-semibold tracking-tight">
        Talk to someone now
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        If you are thinking about harming yourself, you deserve support from a
        real person right now — not a form. These lines are free, confidential,
        and open 24/7.
      </p>

      <div className="mt-9 space-y-4">
        {resources.map((r) => (
          <div
            key={r.name}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <h2 className="text-lg font-semibold">{r.name}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              {r.detail}
            </p>
            <a
              href={r.href}
              className="mt-4 inline-flex rounded-full bg-danger px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {r.action}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-ink-faint">
        Covera is a hackathon prototype and cannot provide crisis care. The
        resources above are real, national, and free.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex text-sm font-medium text-brand underline underline-offset-4"
      >
        Back to home
      </Link>
    </div>
  );
}
