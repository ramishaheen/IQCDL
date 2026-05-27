"use client";

import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/cn";

export function openEnroll() {
  window.dispatchEvent(new CustomEvent("iqcdl:open-enroll"));
}

export function MemberButton({ className }: { className?: string }) {
  const { dict } = useLocale();
  return (
    <motion.button
      type="button"
      onClick={openEnroll}
      className={cn(
        "relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-4 py-2 text-sm font-semibold text-white shadow-glow",
        className,
      )}
      style={{
        backgroundImage: "linear-gradient(100deg,#2ba9e0,#1d8ec2,#38bdf8)",
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* shimmer sweep */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/30 blur-md"
        animate={{ left: ["-40%", "140%"] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      />
      <motion.span
        animate={{ rotate: [0, 12, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Gem className="h-4 w-4" />
      </motion.span>
      <span className="relative">{dict.membership.cta}</span>
    </motion.button>
  );
}
