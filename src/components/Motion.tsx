"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// Animation here is strictly an enhancement. The content is visible unless we have
// positively confirmed we can animate it, and a timer un-hides anything the observer
// never reports on. Nothing on this site should ever be stuck invisible because an
// IntersectionObserver callback didn't arrive.

const FAILSAFE_MS = 1200;

function useReveal<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState(false);

  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    // Only hide things that start below the fold — anything already on screen
    // should just be there when the page paints.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);

    // If the callback never comes, show it anyway.
    const failsafe = window.setTimeout(() => setSeen(true), FAILSAFE_MS);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [armed, threshold]);

  return { ref, hidden: armed && !seen, triggered: !armed || seen };
}

/** Rise-and-fade as the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, hidden } = useReveal<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={`${hidden ? "reveal" : "reveal is-visible"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Counts a metric up when it scrolls into view. Only the number animates — prefixes
 * and suffixes like "~" and "M" pass through untouched. Renders the final value
 * immediately if it is already on screen, or if anything about the observer fails.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 900,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const { ref, triggered } = useReveal<HTMLSpanElement>(0.3);
  const [n, setN] = useState(value);

  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setN(0);
  }, [ref]);

  useEffect(() => {
    if (!triggered || value === 0) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - t, 3)))); // ease-out cubic
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [triggered, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
