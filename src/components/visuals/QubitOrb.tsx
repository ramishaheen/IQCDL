"use client";

import { motion } from "framer-motion";

/** Decorative animated "qubit" — a glowing core with orbiting electron rings. */
export default function QubitOrb({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        {/* glow */}
        <div className="absolute inset-0 rounded-full bg-brand-300/40 blur-3xl" />

        {/* orbit rings */}
        {[0, 60, 120].map((rot, i) => (
          <motion.div
            key={rot}
            className="absolute inset-[12%] rounded-full border border-slate-200"
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
                  i === 0 ? "#38bdf8" : i === 1 ? "#2ba9e0" : "#1d8ec2",
                boxShadow: `0 0 14px ${
                  i === 0 ? "#38bdf8" : i === 1 ? "#2ba9e0" : "#1d8ec2"
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
              "radial-gradient(circle at 35% 30%, #d6eefb, #2ba9e0 45%, #1a72a0 85%)",
            boxShadow: "0 0 60px -5px rgba(43,169,224,0.8)",
          }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* |0> and |1> labels */}
        <span className="absolute left-1/2 top-[6%] -translate-x-1/2 font-display text-sm text-slate-500">
          |0⟩
        </span>
        <span className="absolute left-1/2 bottom-[6%] -translate-x-1/2 font-display text-sm text-slate-500">
          |1⟩
        </span>
      </div>
    </div>
  );
}
