"use client";

import { motion } from "framer-motion";

/** Decorative animated "qubit" — a glowing core with orbiting electron rings. */
export default function QubitOrb({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        {/* glow */}
        <div className="absolute inset-0 rounded-full bg-quantum-indigo/30 blur-3xl" />

        {/* orbit rings */}
        {[0, 60, 120].map((rot, i) => (
          <motion.div
            key={rot}
            className="absolute inset-[12%] rounded-full border border-white/15"
            style={{
              transform: `rotateX(72deg) rotateZ(${rot}deg)`,
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateZ: [rot, rot + 360] }}
            transition={{
              duration: 14 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
              style={{
                background:
                  i === 0 ? "#22d3ee" : i === 1 ? "#d946ef" : "#818cf8",
                boxShadow: `0 0 14px ${
                  i === 0 ? "#22d3ee" : i === 1 ? "#d946ef" : "#818cf8"
                }`,
              }}
            />
          </motion.div>
        ))}

        {/* core */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #c7d2fe, #6366f1 45%, #4338ca 80%)",
            boxShadow: "0 0 60px -5px rgba(99,102,241,0.85)",
          }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* |0> and |1> labels */}
        <span className="absolute left-1/2 top-[6%] -translate-x-1/2 font-display text-sm text-white/70">
          |0⟩
        </span>
        <span className="absolute left-1/2 bottom-[6%] -translate-x-1/2 font-display text-sm text-white/70">
          |1⟩
        </span>
      </div>
    </div>
  );
}
