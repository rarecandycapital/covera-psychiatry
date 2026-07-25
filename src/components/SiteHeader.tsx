import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-[10px] bg-brand font-display text-[15px] font-semibold text-white"
          >
            C
          </span>
          <span className="font-display text-[19px] font-semibold tracking-tight">
            Covera
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/crisis"
            className="rounded-card border border-danger/20 bg-danger-soft px-3.5 py-2 text-[13px] font-medium text-danger transition-colors hover:bg-danger/10"
          >
            <span className="sm:hidden">Crisis help</span>
            <span className="hidden sm:inline">In crisis? Get help now</span>
          </Link>
          <Link
            href="/coverage"
            className="hidden rounded-card bg-brand px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-brand-hover sm:inline-block"
          >
            Check coverage
          </Link>
        </div>
      </div>
    </header>
  );
}
