import Link from "next/link";

// Placeholder — replaced by the real Stedi-backed coverage check.
export default function CoveragePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Coverage check</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        This step verifies your insurance before you answer anything else.
        Under construction.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex text-sm font-medium text-brand underline underline-offset-4"
      >
        Back to home
      </Link>
    </div>
  );
}
