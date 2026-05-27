"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { RoadmapTimeline } from "@/components/sections/RoadmapTimeline";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function RoadmapPage() {
  const { dict } = useLocale();
  return (
    <>
      <PageHero
        eyebrow={dict.roadmap.eyebrow}
        title={dict.roadmap.title}
        subtitle={dict.roadmap.subtitle}
      />
      <RoadmapTimeline withHeading={false} />
      <FinalCTA />
    </>
  );
}
