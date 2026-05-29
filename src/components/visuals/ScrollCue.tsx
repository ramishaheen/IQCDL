"use client";

import { motion } from "framer-motion";

/**
 * Subtle scroll-hint pill shown at the bottom of a hero — a vertical line
 * with a falling dot, plus a label. Fades out as the user scrolls.
 */
export function ScrollCue({ label = "Scroll" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/60">
          {label}
        </span>
        <div className="relative h-9 w-px overflow-hidden bg-white/15">
          <motion.div
            className="absolute left-0 right-0 top-0 h-3 bg-gradient-to-b from-quantum-cyan to-transparent"
            animate={{ y: ["-100%", "120%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
}
