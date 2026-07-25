"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The landing page opens on a full-bleed photograph, so there the header sits over the
// image and scrolls away with it. Everywhere else it is a normal sticky bar.
//
// This is deliberately state-free. An earlier version faded the header to solid on
// scroll, which meant a missed scroll event could leave white type on a cream
// background. Not worth the risk for the effect.

export function SiteHeader() {
  const pathname = usePathname();
  const overHero = pathname === "/";

  return (
    <header
      className={
        overHero
          ? "absolute inset-x-0 top-0 z-30 text-white"
          : "sticky top-0 z-30 border-b border-line bg-bg text-ink"
      }
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className={`grid h-8 w-8 place-items-center rounded-[4px] font-display text-[15px] font-semibold ${
              overHero ? "bg-white text-brand" : "bg-brand text-white"
            }`}
          >
            C
          </span>
          <span className="font-display text-[19px] font-semibold tracking-tight">
            Covera
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/coverage"
            className={`text-[14px] font-medium transition-colors ${
              overHero
                ? "text-white/80 hover:text-white"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            For patients
          </Link>
          <Link
            href="/for-clinicians"
            className={`text-[14px] font-medium transition-colors ${
              overHero
                ? "text-white/80 hover:text-white"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            For clinicians
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/crisis"
            className={`rounded-card px-3.5 py-2 text-[13px] font-medium transition-colors ${
              overHero
                ? "border border-white/35 text-white hover:bg-white/10"
                : "border border-danger/20 bg-danger-soft text-danger hover:bg-danger/10"
            }`}
          >
            <span className="sm:hidden">Crisis help</span>
            <span className="hidden sm:inline">In crisis? Get help now</span>
          </Link>
          <Link
            href="/coverage"
            className={`hidden rounded-card px-4 py-2 text-[13px] font-medium transition-colors sm:inline-block ${
              overHero
                ? "bg-white text-brand hover:bg-white/90"
                : "bg-brand text-white hover:bg-brand-hover"
            }`}
          >
            Check coverage
          </Link>
        </div>
      </div>
    </header>
  );
}
