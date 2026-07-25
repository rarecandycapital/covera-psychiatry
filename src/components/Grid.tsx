import type { ReactNode } from "react";

// The 12-column grid everything on the marketing pages sits on. One container width,
// one gutter, one set of column spans — so the type and the images line up on the same
// vertical rules all the way down the page.

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 sm:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Grid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-12 gap-x-6 ${className}`}>{children}</div>
  );
}

/**
 * A page section: hairline rule on top, mono number in the left margin, content in the
 * remaining columns. The number is what makes the grid legible as a system rather than
 * as a stack of cards.
 */
export function Section({
  number,
  label,
  children,
  className = "",
  rule = true,
}: {
  number: string;
  label: string;
  children: ReactNode;
  className?: string;
  rule?: boolean;
}) {
  return (
    <section className={rule ? "border-t border-line" : ""}>
      <Container>
        <Grid className={`py-20 sm:py-28 lg:py-36 ${className}`}>
          <div className="col-span-12 mb-8 lg:col-span-2 lg:mb-0">
            <p className="label-mono text-ink-faint">
              {number}
              <span className="mx-2 text-line">/</span>
              {label}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-10">{children}</div>
        </Grid>
      </Container>
    </section>
  );
}
