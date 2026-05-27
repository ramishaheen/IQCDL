"use client";

import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Trophy } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";

function Inner() {
  const { dict } = useLocale();
  return (
    <section className="section pt-0">
      <div className="container-x">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg">
          <div className="card p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-500">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-fg">{dict.gqa.submit.submitted}</h1>
            <p className="mt-2 text-muted">{dict.gqa.sdgBody}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/awards" className="btn-primary text-white">
                <Trophy className="h-4 w-4" />
                {dict.gqa.eyebrow}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AwardSuccessPage() {
  const { dict } = useLocale();
  return (
    <>
      <PageHero eyebrow={dict.gqa.eyebrow} title="🏆" />
      <Suspense fallback={<div className="h-40" />}>
        <Inner />
      </Suspense>
    </>
  );
}
