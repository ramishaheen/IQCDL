"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, Tag, Users, Share2 } from "lucide-react";
import { QuantumSpark } from "@/components/visuals/QuantumSpark";
import { useMembership } from "@/components/providers/MembershipProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { PageHero } from "@/components/ui/PageHero";
import { BadgeStudio } from "@/components/membership/BadgeStudio";

function SuccessInner() {
  const params = useSearchParams();
  const { membership, grant } = useMembership();
  const { dict } = useLocale();
  const granted = useRef(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (granted.current) return;
    granted.current = true;
    if (!membership) {
      grant({
        email: params.get("e") ?? "",
        name: params.get("n") ?? "Member",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const id = membership?.id ?? "…";
  const code = membership?.discountCode ?? "IQCDL10";

  return (
    <section className="section pt-0">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg"
        >
          <div className="card p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-500">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-fg">Welcome to IQCDL</h1>
            <p className="mt-2 text-muted">
              Your Community membership is active. You now have access to the
              member community, the AI Quantum Guide chat, free features and a
              course discount.
            </p>

            <div className="mt-6 space-y-3 text-start">
              <div className="rounded-xl border border-line/10 bg-surface/5 p-4">
                <p className="text-[11px] uppercase tracking-wider text-faint">
                  Your membership ID
                </p>
                <p className="mt-0.5 font-mono text-lg font-semibold text-accent">{id}</p>
                <p className="mt-1 text-xs text-muted">
                  Keep this — you'll use it to unlock the Quantum Guide chat.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-line/10 bg-surface/5 p-4">
                <Tag className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-faint">
                    10% course discount code
                  </p>
                  <p className="font-mono font-semibold text-fg">{code}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("iqcdl:open-guide"))}
                className="btn-primary"
              >
                <MessageSquare className="h-4 w-4" />
                Chat with the Quantum Guide
              </button>
              <Link href="/community" className="btn-ghost">
                <Users className="h-4 w-4" />
                Open the community
              </Link>
              <Link href="/programs" className="btn-ghost">
                <QuantumSpark className="h-4 w-4" />
                Browse courses
              </Link>
            </div>
          </div>

          {/* shareable member badge */}
          <div className="card mt-6 p-6 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-fg">
                  <Share2 className="h-5 w-5 text-accent" />
                  {dict.membership.badge.title}
                </h2>
                <p className="mt-1 max-w-md text-sm text-muted">{dict.membership.badge.subtitle}</p>
              </div>
              {!showBadge && (
                <button onClick={() => setShowBadge(true)} className="btn-primary shrink-0 text-white">
                  <Share2 className="h-4 w-4" />
                  {dict.membership.badge.open}
                </button>
              )}
            </div>
            {showBadge && (
              <div className="mt-6">
                <BadgeStudio name={membership?.name || params.get("n") || "IQCDL Member"} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function MembershipSuccessPage() {
  return (
    <>
      <PageHero eyebrow="Membership" title="You're in" />
      <Suspense fallback={<div className="h-40" />}>
        <SuccessInner />
      </Suspense>
    </>
  );
}
