import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="IQCDL home"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo to-quantum-cyan shadow-glow">
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/30" />
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
          <circle cx="12" cy="12" r="2.4" fill="currentColor" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            stroke="currentColor"
            strokeWidth="1.3"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            stroke="currentColor"
            strokeWidth="1.3"
            transform="rotate(120 12 12)"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-white">
        IQCDL
      </span>
    </Link>
  );
}
