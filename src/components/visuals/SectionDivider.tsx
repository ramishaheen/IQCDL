import { cn } from "@/lib/cn";

/**
 * Section bridge: hairline gradient + a glowing pulse that travels across,
 * plus occasional vertical "thunder" flickers — keeps the homepage rhythm
 * consistent with the Library lightning canvas.
 *
 * Pure SVG + SMIL — no client JS, safe to render multiple times.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center px-5 py-6", className)}>
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="h-6 w-full max-w-5xl"
        aria-hidden="true"
      >
        {/* base gradient hairline */}
        <line
          x1="0"
          y1="12"
          x2="1200"
          y2="12"
          stroke="url(#sd-line)"
          strokeWidth="1"
        />
        {/* travelling glow blob */}
        <circle cy="12" r="9" fill="#38bdf8" fillOpacity="0.18">
          <animate attributeName="cx" values="60;1140;60" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.55;0.55;0" keyTimes="0;0.1;0.9;1" dur="9s" repeatCount="indefinite" />
        </circle>
        {/* travelling bright dot */}
        <circle cy="12" r="2.8" fill="#7dd3fc">
          <animate attributeName="cx" values="60;1140;60" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="9s" repeatCount="indefinite" />
        </circle>

        {/* two tiny vertical "thunder" flickers — staggered */}
        <line x1="300" x2="300" y1="0" y2="24" stroke="#7dd3fc" strokeWidth="1" opacity="0">
          <animate attributeName="opacity" values="0;0.9;0;0" keyTimes="0;0.04;0.08;1" dur="6.5s" begin="0.6s" repeatCount="indefinite" />
        </line>
        <line x1="900" x2="900" y1="0" y2="24" stroke="#7dd3fc" strokeWidth="1" opacity="0">
          <animate attributeName="opacity" values="0;0.9;0;0" keyTimes="0;0.04;0.08;1" dur="7.4s" begin="2.4s" repeatCount="indefinite" />
        </line>

        <defs>
          <linearGradient id="sd-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
