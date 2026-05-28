"use client";

import { motion } from "framer-motion";

/**
 * Animated illustrative "quantum machine at work": a stylized QPU chip with a
 * lattice of qubits, photonic pulses travelling along wires, concentric
 * cooling rings expanding outward, and electrons orbiting overhead.
 *
 * Pure SVG + SMIL/framer-motion — no images, sized fluidly to its container.
 */
export function QuantumMachine({ className }: { className?: string }) {
  // 4 x 3 qubit lattice positions inside the chip
  const qubitCols = [350, 410, 470, 530];
  const qubitRows = [180, 220, 260];
  const qubits = qubitCols.flatMap((cx) => qubitRows.map((cy) => ({ cx, cy })));

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      {/* glow behind chip */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_70%)]" />
      <svg
        viewBox="0 0 880 460"
        className="block w-full"
        role="img"
        aria-label="Animated quantum processing unit"
      >
        {/* concentric cooling rings (sonar) */}
        {[0, 1, 2].map((i) => (
          <circle
            key={`ring-${i}`}
            cx="440"
            cy="220"
            r="110"
            fill="none"
            stroke="#38bdf8"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          >
            <animate
              attributeName="r"
              values="110;240;110"
              dur="6s"
              begin={`${i * 2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.45;0;0.45"
              dur="6s"
              begin={`${i * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* outer orbital electrons */}
        <g stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1.2" fill="none">
          <ellipse cx="440" cy="220" rx="220" ry="78" />
          <ellipse
            cx="440"
            cy="220"
            rx="220"
            ry="78"
            transform="rotate(60 440 220)"
          />
          <ellipse
            cx="440"
            cy="220"
            rx="220"
            ry="78"
            transform="rotate(120 440 220)"
          />
        </g>
        {[
          { dur: 9, rot: 0 },
          { dur: 12, rot: 60 },
          { dur: 14, rot: 120 },
        ].map((o, i) => (
          <g key={`orbit-${i}`}>
            <circle cx="660" cy="220" r="5.5" fill="#38bdf8">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`${o.rot} 440 220`}
                to={`${o.rot + 360} 440 220`}
                dur={`${o.dur}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* QPU chip outline */}
        <rect
          x="300"
          y="140"
          width="280"
          height="160"
          rx="22"
          fill="url(#chipGrad)"
          stroke="#38bdf8"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <rect
          x="300"
          y="140"
          width="280"
          height="160"
          rx="22"
          fill="none"
          stroke="#38bdf8"
          strokeOpacity="0.15"
          strokeWidth="6"
        />
        {/* chip pins (cosmetic) */}
        {[160, 200, 240, 280].map((y) => (
          <g key={`pins-${y}`} fill="#38bdf8" opacity="0.4">
            <rect x="285" y={y - 3} width="10" height="6" rx="1" />
            <rect x="585" y={y - 3} width="10" height="6" rx="1" />
          </g>
        ))}

        {/* horizontal & vertical bus wires */}
        <g stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1" fill="none">
          {qubitRows.map((y) => (
            <line key={`hl-${y}`} x1="320" y1={y} x2="560" y2={y} />
          ))}
          {qubitCols.map((x) => (
            <line key={`vl-${x}`} x1={x} y1="160" x2={x} y2="280" />
          ))}
        </g>

        {/* qubits */}
        {qubits.map((q, i) => (
          <g key={`q-${i}`}>
            <circle
              cx={q.cx}
              cy={q.cy}
              r="6"
              fill="#0b1426"
              stroke="#38bdf8"
              strokeWidth="1.4"
            >
              <animate
                attributeName="r"
                values="5;7;5"
                dur="2.4s"
                begin={`${(i % 4) * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={q.cx} cy={q.cy} r="2.4" fill="#38bdf8">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="2.4s"
                begin={`${(i % 4) * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* photonic pulses travelling along the rows */}
        {qubitRows.map((y, i) => (
          <circle
            key={`pulse-${y}`}
            r="3.2"
            fill="#7dd3fc"
            opacity="0.95"
          >
            <animateMotion
              dur={`${3 + i * 0.6}s`}
              repeatCount="indefinite"
              path={`M 320 ${y} L 560 ${y}`}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur={`${3 + i * 0.6}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {/* photonic pulses along columns (alternate direction) */}
        {qubitCols.map((x, i) => (
          <circle key={`pulse-c-${x}`} r="3" fill="#a5f3fc" opacity="0.85">
            <animateMotion
              dur={`${4 + i * 0.5}s`}
              repeatCount="indefinite"
              path={
                i % 2 === 0
                  ? `M ${x} 160 L ${x} 280`
                  : `M ${x} 280 L ${x} 160`
              }
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur={`${4 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* labels */}
        <g fontFamily="Arial, Helvetica, sans-serif" fill="#94a3b8">
          <text x="300" y="125" fontSize="11" letterSpacing="3">
            QPU · 12-qubit lattice
          </text>
          <text x="300" y="328" fontSize="10" letterSpacing="2">
            Coherence
          </text>
          <text x="375" y="328" fontSize="10" letterSpacing="1" fill="#38bdf8">
            99.4%
          </text>
          <text x="450" y="328" fontSize="10" letterSpacing="2">
            Gate fidelity
          </text>
          <text x="540" y="328" fontSize="10" letterSpacing="1" fill="#38bdf8">
            99.1%
          </text>
        </g>

        <defs>
          <linearGradient id="chipGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0b1426" />
            <stop offset="100%" stopColor="#06101e" />
          </linearGradient>
        </defs>
      </svg>

      {/* breathing data-readout overlay */}
      <motion.div
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-3 right-3 hidden rounded-md border border-quantum-cyan/30 bg-quantum-cyan/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-quantum-cyan sm:block"
      >
        ● Live · running
      </motion.div>
    </div>
  );
}
