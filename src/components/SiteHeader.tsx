import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-[13px] font-bold text-white"
          >
            C
          </span>
          <span className="text-[17px] font-semibold tracking-tight">
            Covera
          </span>
        </Link>
        <Link
          href="/crisis"
          className="rounded-full border border-danger/25 bg-danger-soft px-3 py-1.5 text-[13px] font-medium text-danger transition-colors hover:bg-danger/10"
        >
          In crisis? Get help now
        </Link>
      </div>
    </header>
  );
}
