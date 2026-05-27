import { cn } from "@/lib/cn";

interface Node {
  x: number;
  y: number;
  r: number;
  dur: number;
}

const NODES: Node[] = [
  { x: 40, y: 60, r: 4, dur: 3.2 },
  { x: 150, y: 30, r: 3, dur: 4.1 },
  { x: 250, y: 90, r: 5, dur: 3.6 },
  { x: 120, y: 140, r: 3.5, dur: 4.6 },
  { x: 220, y: 200, r: 4, dur: 3.9 },
  { x: 60, y: 210, r: 3, dur: 4.3 },
  { x: 300, y: 160, r: 3.5, dur: 3.4 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [3, 5],
  [2, 6],
  [4, 6],
  [2, 4],
];

/**
 * Decorative animated quantum network (pulsing nodes + flowing links).
 * Pure SVG + SMIL — no client JS. Render inside a positioned, low-opacity wrapper.
 */
export function QuantumAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 240"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      fill="none"
    >
      <g stroke="#38bdf8" strokeWidth="1">
        {LINKS.map(([a, b], i) => {
          const n1 = NODES[a];
          const n2 = NODES[b];
          const len = Math.hypot(n2.x - n1.x, n2.y - n1.y);
          return (
            <line
              key={i}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              strokeOpacity="0.35"
              strokeDasharray={`${len * 0.3} ${len}`}
            >
              <animate
                attributeName="stroke-dashoffset"
                from={len * 1.3}
                to="0"
                dur={`${5 + (i % 3)}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}
      </g>
      <g fill="#7dd3fc">
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r}>
            <animate
              attributeName="opacity"
              values="0.35;1;0.35"
              dur={`${n.dur}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values={`${n.r};${n.r + 1.5};${n.r}`}
              dur={`${n.dur}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  );
}
