"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterProps {
  text: string;
  /** Per-character delay in ms (default 35). */
  speed?: number;
  /** Initial delay before typing starts once the element is in view (ms). */
  startDelay?: number;
  className?: string;
}

/**
 * Types out the given text character-by-character once it scrolls into view,
 * with a blinking caret that keeps blinking after typing completes. Honors
 * prefers-reduced-motion (renders the text instantly).
 */
export function Typewriter({
  text,
  speed = 38,
  startDelay = 250,
  className,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(text);
      return;
    }
    let cancelled = false;
    let i = 0;
    let timer: number | undefined;
    const tick = () => {
      if (cancelled) return;
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) {
        timer = window.setTimeout(tick, speed);
      }
    };
    timer = window.setTimeout(tick, startDelay);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [inView, text, speed, startDelay]);

  return (
    <span ref={ref} className={className}>
      {shown}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 0.5, 1],
        }}
        className="ms-1 inline-block h-[0.85em] w-[3px] translate-y-[0.05em] rounded-sm bg-quantum-cyan align-middle"
      />
    </span>
  );
}
