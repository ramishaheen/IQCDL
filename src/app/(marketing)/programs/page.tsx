"use client";

import { Sparkles, GraduationCap, Cpu } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { LevelOutline } from "@/components/programs/LevelOutline";
import { SectionDivider } from "@/components/visuals/SectionDivider";
import { Pricing } from "@/components/home/Pricing";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function ProgramsPage() {
  const { dict } = useLocale();
  const { everyone, foundation, practitioner } = dict.tracks;

  return (
    <>
      <PageHero
        eyebrow={dict.tracks.eyebrow}
        title={dict.tracks.title}
        subtitle={dict.tracks.subtitle}
      />

      <LevelOutline
        level={everyone}
        icon={Sparkles}
        accent="from-quantum-cyan to-quantum-blue"
        index={0}
        badge="Free"
        cta="Start free"
        ctaHref="/login"
      />
      <SectionDivider />
      <LevelOutline
        level={foundation}
        icon={GraduationCap}
        accent="from-quantum-blue to-quantum-indigo"
        index={1}
        cta="Enroll in Foundation"
        ctaHref="/#pricing"
      />
      <SectionDivider />
      <LevelOutline
        level={practitioner}
        icon={Cpu}
        accent="from-quantum-indigo to-quantum-violet"
        index={2}
        cta="Enroll in Practitioner"
        ctaHref="/#pricing"
      />

      <Pricing />
      <FinalCTA />
    </>
  );
}
