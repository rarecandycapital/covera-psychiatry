"use client";

import { useEffect, useRef, useState } from "react";

// Image slot that degrades to a labelled placeholder when the file isn't there yet.
// Drop a correctly-named file into public/images/ and it appears on the next load —
// no code change needed.

export function Figure({
  src,
  alt,
  ratio = "4 / 3",
  note,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  /** Shown in the placeholder so it's obvious what photo belongs here. */
  note?: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const filename = src.split("/").pop();

  // The error event usually fires while the server HTML is still parsing, before
  // React attaches onError. Re-check the decoded size once we're mounted.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div
      className={`overflow-hidden rounded-card bg-bg-warm ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-line px-6 text-center">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full bg-sage-soft text-sage"
          >
            ◳
          </span>
          <p className="font-mono text-[11.5px] text-ink-faint">{filename}</p>
          {note && (
            <p className="max-w-[26ch] text-[12.5px] leading-snug text-ink-faint">
              {note}
            </p>
          )}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={alt}
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
