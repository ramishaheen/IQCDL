"use client";

import { Reveal } from "@/components/ui/Reveal";

interface FaqQuestion {
  "@type"?: string;
  name: string;
  acceptedAnswer: { "@type"?: string; text: string };
}

interface FaqSchema {
  "@context"?: string;
  "@type"?: string;
  mainEntity: FaqQuestion[];
}

export function FaqAccordion({
  title = "Frequently asked",
  schema,
  className = "",
}: {
  title?: string;
  schema: FaqSchema;
  className?: string;
}) {
  return (
    <section className={`section pt-0 ${className}`.trim()}>
      <div className="container-x mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold text-fg sm:text-3xl">{title}</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {schema.mainEntity.map((q) => (
            <Reveal key={q.name}>
              <details className="card group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-base font-semibold text-fg">
                  <span>{q.name}</span>
                  <span className="text-quantum-cyan transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {q.acceptedAnswer.text}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
