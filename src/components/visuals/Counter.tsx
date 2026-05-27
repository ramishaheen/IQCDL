"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Counts a numeric value up when scrolled into view. Parses a display string
 * like "$106B", "55%", "8+" into prefix / number / suffix and animates only
 * the number. Parsing is memoized so the animation isn't restarted on every
 * re-render (which previously froze the count at a near-zero value).
 */
export function Counter({ raw, className }: { raw: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const parsed = useMemo(() => {
    const m = raw.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
    if (!m) return null;
    return {
      prefix: m[1],
      target: parseFloat(m[2]),
      suffix: m[3],
      decimals: m[2].includes(".") ? 1 : 0,
    };
  }, [raw]);

  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || !parsed) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(parsed.target);
      return;
    }
    const duration = 1300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parsed.target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed]);

  if (!parsed) return <span className={className}>{raw}</span>;

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {val.toLocaleString(undefined, {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })}
      {parsed.suffix}
    </span>
  );
}
