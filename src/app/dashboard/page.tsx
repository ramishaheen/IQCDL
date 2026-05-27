"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  Building2,
  Network,
  CalendarClock,
  Ticket,
  BookOpen,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Role } from "@/lib/auth";

// Illustrative metric values per role (demo data).
const METRIC_VALUES: Record<Role, string[]> = {
  admin: ["12,480", "7,932", "146", "28"],
  chapter: ["18", "1,240", "82%", "$486K"],
  center: ["6", "3", "11", "320"],
  trainer: ["4", "96", "68%", "81%"],
  student: ["64%", "78%", "55%", "12"],
};

const PANEL_ICONS = [BookOpen, ClipboardList, CalendarClock, Award];

// Routes wired for the student portal panels (others are illustrative).
const PANEL_HREFS: Partial<Record<Role, (string | undefined)[]>> = {
  student: ["/programs", "/dashboard/exam", "/assessment", "/dashboard/certificate"],
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { dict, t } = useLocale();
  if (!user) return null;

  const role = user.role;
  const data = dict.dashboard[role];
  const metrics = data.metrics;
  const panels = data.panels;
  const values = METRIC_VALUES[role];

  const quickLinks: Record<Role, { label: string; href: string }[]> = {
    admin: [
      { label: dict.footer.links.standards, href: "/standards" },
      { label: dict.nav.roadmap, href: "/roadmap" },
    ],
    chapter: [{ label: dict.nav.program, href: "/programs" }],
    center: [{ label: dict.nav.program, href: "/programs" }],
    trainer: [{ label: dict.nav.training, href: "/programs" }],
    student: [
      { label: dict.assessment.title, href: "/assessment" },
      { label: dict.nav.program, href: "/programs" },
    ],
  };

  return (
    <div className="space-y-8">
      {/* greeting */}
      <div>
        <p className="text-sm text-slate-500">
          {t("dashboard.signedInAs")} {user.email}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          {t("dashboard.welcome")}, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-slate-500">{data.title}</p>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((label, i) => {
          const Icon = [TrendingUp, Award, Building2, Network][i % 4];
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-quantum-indigo/20 text-quantum-cyan">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-slate-900">
                {values[i]}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* student progress */}
      {role === "student" && (
        <div className="card p-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-900">
              {dict.dashboard.student.progressLabel}
            </span>
            <span className="text-quantum-cyan">64%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-quantum-cyan to-quantum-violet"
              initial={{ width: 0 }}
              animate={{ width: "64%" }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* panels / quick actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {t("dashboard.quickActions")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {panels.map((panel, i) => {
            const Icon = PANEL_ICONS[i % PANEL_ICONS.length];
            const href = PANEL_HREFS[role]?.[i];
            const cls =
              "card group flex items-center justify-between gap-4 p-5 transition hover:border-brand-300 hover:shadow-glow";
            const inner = (
              <>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-quantum-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-slate-900">{panel}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-quantum-cyan rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </>
            );
            return href ? (
              <Link key={panel} href={href} className={cls}>
                {inner}
              </Link>
            ) : (
              <motion.div
                key={panel}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className={cls}
              >
                {inner}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* contextual links */}
      <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="font-medium text-slate-900">{dict.cta.title}</p>
          <p className="text-sm text-slate-500">{dict.cta.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickLinks[role].map((link) => (
            <Link key={link.href} href={link.href} className="btn-ghost">
              {link.label}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
