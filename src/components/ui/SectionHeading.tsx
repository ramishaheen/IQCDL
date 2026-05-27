import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-start",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-balance text-base leading-relaxed text-slate-300/90 sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
