import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * IQCDL logo. `mark` is the compact glyph + wordmark (navbar/headers);
 * `full` is the complete lockup with tagline (footer/login/certificate).
 */
export function Logo({
  className,
  imgClassName,
  variant = "mark",
}: {
  className?: string;
  imgClassName?: string;
  variant?: "mark" | "full";
}) {
  const src = variant === "full" ? "/iqcdl-logo.svg" : "/iqcdl-mark.svg";
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label="IQCDL — International Quantum Computing Driving License home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="IQCDL — International Quantum Computing Driving License"
        className={cn("w-auto select-none", variant === "full" ? "h-12" : "h-9", imgClassName)}
      />
    </Link>
  );
}
