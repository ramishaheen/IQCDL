import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Official IQCDL logo (full lockup). The source asset has a white background,
 * so it sits cleanly on the light theme's white surfaces.
 */
export function Logo({
  className,
  imgClassName,
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label="IQCDL — International Quantum Computing Driving License home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/iqcdl-logo.svg"
        alt="IQCDL — International Quantum Computing Driving License"
        className={cn("h-9 w-auto select-none", imgClassName)}
      />
    </Link>
  );
}
