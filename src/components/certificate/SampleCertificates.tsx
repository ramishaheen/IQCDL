"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SampleCertificate, type SampleLevel } from "./SampleCertificate";
import { cn } from "@/lib/cn";

export function SampleCertificates() {
  const { dict } = useLocale();
  const c = dict.certificate;
  const [level, setLevel] = useState<SampleLevel>("foundation");

  const tabs: { key: SampleLevel; label: string }[] = [
    { key: "everyone", label: dict.tracks.everyone.name },
    { key: "foundation", label: dict.tracks.foundation.name },
    { key: "practitioner", label: dict.tracks.practitioner.name },
  ];

  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="gradient-text-animated text-3xl font-bold sm:text-4xl">{c.samplesTitle}</h2>
          <p className="mt-3 text-muted">{c.samplesSubtitle}</p>
        </Reveal>

        <Reveal className="mx-auto mt-8 flex max-w-md justify-center gap-1.5 rounded-2xl border border-line/10 bg-surface/5 p-1.5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setLevel(t.key)}
              className={cn(
                "flex-1 rounded-xl px-3 py-2 text-sm font-medium transition",
                level === t.key ? "bg-brand-500 text-white" : "text-muted hover:bg-surface/10",
              )}
            >
              {t.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-8">
          <SampleCertificate levelKey={level} />
        </div>
        <p className="mt-4 text-center text-xs text-faint">{c.sampleNote}</p>
      </div>
    </section>
  );
}
