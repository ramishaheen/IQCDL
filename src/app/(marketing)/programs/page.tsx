"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramTracks } from "@/components/home/ProgramTracks";
import { Pricing } from "@/components/home/Pricing";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function ProgramsPage() {
  const { dict } = useLocale();
  return (
    <>
      <PageHero
        eyebrow={dict.tracks.eyebrow}
        title={dict.tracks.title}
        subtitle={dict.tracks.subtitle}
      />
      <ProgramTracks withHeading={false} />
      <Pricing />
      <FinalCTA />
    </>
  );
}
