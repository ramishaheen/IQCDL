import { forwardRef, type SVGProps } from "react";

/**
 * A more refined replacement for lucide's Sparkles — a 4-point quantum
 * spark with curved (concave) sides, a smaller companion spark and a
 * tiny dot accent. forwardRef so it's a drop-in for LucideIcon contexts
 * (icon registries, components typed against LucideIcon, etc.).
 */
export const QuantumSpark = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function QuantumSpark({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        role="img"
        aria-hidden="true"
        {...props}
      >
        <path d="M12 2 C 12.6 8, 16 11.4, 22 12 C 16 12.6, 12.6 16, 12 22 C 11.4 16, 8 12.6, 2 12 C 8 11.4, 11.4 8, 12 2 Z" />
        <path
          d="M18.5 2 C 18.7 4, 19.6 4.9, 21.5 5 C 19.6 5.1, 18.7 6, 18.5 8 C 18.3 6, 17.4 5.1, 15.5 5 C 17.4 4.9, 18.3 4, 18.5 2 Z"
          opacity="0.85"
        />
        <circle cx="4" cy="18.5" r="1.1" />
      </svg>
    );
  }
);
