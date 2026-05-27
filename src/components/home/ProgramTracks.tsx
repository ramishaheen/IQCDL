"use client";

import Link from "next/link";
import { Check, GraduationCap, Cpu, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { QuantumAccent } from "@/components/visuals/QuantumAccent";
import { cn } from "@/lib/cn";

export function ProgramTracks({ withHeading = true }: { withHeading?: boolean }) {
  const { dict, t } = useLocale();
  const tracks = [
    {
      id: "foundation",
      data: dict.tracks.foundation,
      icon: GraduationCap,
      accent: "from-quantum-cyan to-quantum-blue",
      featured: false,
    },
    {
      id: "practitioner",
      data: dict.tracks.practitioner,
      icon: Cpu,
      accent: "from-quantum-violet to-quantum-magenta",
      featured: true,
    },
  ];

  return (
    <section id="programs" className="section">
      <QuantumAccent className="absolute -top-4 start-0 -z-10 hidden w-[320px] opacity-25 lg:block" />
      <div className="container-x">
        {withHeading && (
          <SectionHeading
            eyebrow={dict.tracks.eyebrow}
            title={dict.tracks.title}
            subtitle={dict.tracks.subtitle}
          />
        )}

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <Reveal key={track.id} delay={idx * 0.1}>
                <div
                  id={track.id}
                  className={cn(
                    "card group relative h-full overflow-hidden p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-glow sm:p-9",
                    track.featured && "ring-1 ring-brand-400/50",
                  )}
                >
                  <div
                    className={cn(
                      "absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition group-hover:opacity-40",
                      track.accent,
                    )}
                  />
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white",
                        track.accent,
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {track.data.name}
                      </h3>
                      <p className="text-sm text-quantum-cyan">
                        {track.data.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="glass rounded-xl px-3 py-2.5">
                      <p className="text-xs text-slate-400">
                        {t("common.duration")}
                      </p>
                      <p className="font-semibold text-white">
                        {track.data.duration}
                      </p>
                    </div>
                    <div className="glass rounded-xl px-3 py-2.5">
                      <p className="text-xs text-slate-400">
                        {t("common.questions")}
                      </p>
                      <p className="font-semibold text-white">
                        {track.data.exam}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-slate-300">
                    <span className="font-semibold text-white">
                      {track.data.forWho}
                    </span>
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {track.data.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-quantum-cyan" />
                        <span className="text-slate-300">{p}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/#pricing"
                    className={cn(
                      "btn mt-7 w-full",
                      track.featured
                        ? "btn-primary text-white"
                        : "border border-brand-500/40 bg-brand-500/15 text-brand-300 hover:bg-brand-500/20",
                    )}
                  >
                    {t("common.enroll")}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          {dict.tracks.prereq}
        </p>
      </div>
    </section>
  );
}
