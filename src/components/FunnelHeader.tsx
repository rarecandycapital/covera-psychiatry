import type { ReactNode } from "react";

const STEPS = ["Coverage", "Screening", "Match"] as const;

/**
 * Shared masthead for the three funnel screens. Carries the same mono numbering and
 * hairline rules as the marketing pages so the product doesn't drop into bare-form
 * territory the moment someone starts the flow.
 */
export function FunnelHeader({
  step,
  title,
  lede,
  complete = false,
  aside,
}: {
  /** 1-indexed. */
  step: 1 | 2 | 3;
  title: ReactNode;
  lede?: ReactNode;
  complete?: boolean;
  aside?: ReactNode;
}) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-3xl px-5 pb-10 pt-10 sm:pb-12 sm:pt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="label-mono text-ink-faint">
            {String(step).padStart(2, "0")}
            <span className="mx-2 text-line">/</span>
            {STEPS[step - 1]}
            {complete && <span className="ml-2 text-brand">· done</span>}
          </p>
          <ol className="flex items-center gap-2">
            {STEPS.map((s, i) => {
              const done = i + 1 < step || (complete && i + 1 === step);
              const current = i + 1 === step && !complete;
              return (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={`h-1 w-9 rounded-full transition-colors sm:w-14 ${
                      done || current ? "bg-brand" : "bg-line"
                    }`}
                  />
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-[1.4fr_1fr] sm:items-end">
          <h1 className="font-display text-[2.1rem] font-semibold leading-[1.05] sm:text-[2.6rem]">
            {title}
          </h1>
          {aside}
        </div>
        {lede && (
          <p className="mt-5 max-w-[58ch] text-[16.5px] leading-relaxed text-ink-soft">
            {lede}
          </p>
        )}
      </div>
    </header>
  );
}
