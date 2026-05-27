import { cn } from "@/lib/cn";

/**
 * Thin divider with a glowing dot that travels across it.
 * Pure SVG + SMIL (no ids, safe to render multiple times).
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center px-5", className)}>
      <svg
        viewBox="0 0 1200 12"
        preserveAspectRatio="none"
        className="h-3 w-full max-w-5xl"
        aria-hidden="true"
      >
        <line x1="0" y1="6" x2="1200" y2="6" stroke="#7dd3fc" strokeOpacity="0.16" strokeWidth="1" />
        <circle cy="6" r="2.6" fill="#7dd3fc">
          <animate attributeName="cx" values="60;1140;60" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cy="6" r="6" fill="#38bdf8" fillOpacity="0.25">
          <animate attributeName="cx" values="60;1140;60" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.1;0.9;1" dur="9s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
