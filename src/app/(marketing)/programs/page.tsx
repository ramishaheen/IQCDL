"use client";

import { GraduationCap, Cpu } from "lucide-react";
import { QuantumSpark } from "@/components/visuals/QuantumSpark";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { LevelOutline } from "@/components/programs/LevelOutline";
import { SectionDivider } from "@/components/visuals/SectionDivider";
import { Pricing } from "@/components/home/Pricing";
import { SampleCertificates } from "@/components/certificate/SampleCertificates";
import { FinalCTA } from "@/components/home/FinalCTA";
import JsonLd from "@/components/JsonLd";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import courseFoundation from "@/lib/schema/course-foundation.json";
import coursePractitioner from "@/lib/schema/course-practitioner.json";
import courseFreeIntro from "@/lib/schema/course-free-intro.json";
import coursesGraph from "@/lib/schema/courses-iqcdl.json";
import faqPrograms from "@/lib/schema/faq-programs.json";

export default function ProgramsPage() {
  const { dict } = useLocale();
  const { everyone, foundation, practitioner } = dict.tracks;

  return (
    <>
      <JsonLd data={courseFoundation} />
      <JsonLd data={coursePractitioner} />
      <JsonLd data={courseFreeIntro} />
      <JsonLd data={coursesGraph} />
      <JsonLd data={faqPrograms} />
      <PageHero
        eyebrow={dict.tracks.eyebrow}
        title={dict.tracks.title}
        subtitle={dict.tracks.subtitle}
      />

      <LevelOutline
        level={everyone}
        icon={QuantumSpark}
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

      <SampleCertificates />
      <Pricing />
      <FaqAccordion schema={faqPrograms} title="Program FAQ" />
      <FinalCTA />
    </>
  );
}
