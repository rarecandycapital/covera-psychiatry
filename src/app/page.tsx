import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-20">
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
        Insurance first
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
        Find a psychiatrist who takes your insurance — in 90 seconds.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
        Psychiatry is the least in-network specialty in American medicine.
        Everyone else makes you sign up first and find out last. We check your
        coverage before you answer a single question.
      </p>
      <Link
        href="/coverage"
        className="mt-9 inline-flex rounded-full bg-brand px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-brand-hover"
      >
        Check my coverage
      </Link>
      <p className="mt-4 text-sm text-ink-faint">
        No account. No card. Takes about a minute.
      </p>
    </div>
  );
}
