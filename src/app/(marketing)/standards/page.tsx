"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { StandardsGrid } from "@/components/sections/StandardsGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function StandardsPage() {
  const { dict } = useLocale();
  return (
    <>
      <PageHero
        eyebrow={dict.standards.eyebrow}
        title={dict.standards.title}
        subtitle={dict.standards.subtitle}
      />
      <StandardsGrid withHeading={false} />
      <FinalCTA />
    </>
  );
}
