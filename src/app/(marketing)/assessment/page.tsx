"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";

export default function AssessmentPage() {
  const { dict } = useLocale();
  return (
    <>
      <PageHero
        eyebrow={dict.assessment.eyebrow}
        title={dict.assessment.title}
        subtitle={dict.assessment.subtitle}
      />
      <section className="section pt-0">
        <div className="container-x">
          <AssessmentWizard />
        </div>
      </section>
    </>
  );
}
