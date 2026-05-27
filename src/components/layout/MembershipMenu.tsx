"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Award,
  ChevronDown,
  Shield,
  Building2,
  GraduationCap,
  Users,
  UserCircle,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Role } from "@/lib/auth";
import { cn } from "@/lib/cn";

const ROLES: { role: Role; icon: LucideIcon }[] = [
  { role: "admin", icon: Shield },
  { role: "chapter", icon: Building2 },
  { role: "center", icon: GraduationCap },
  { role: "trainer", icon: Users },
  { role: "student", icon: UserCircle },
];

export function MembershipMenu({
  light = false,
  onNavigate,
}: {
  light?: boolean;
  onNavigate?: () => void;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition",
          light
            ? "text-slate-200 hover:bg-white/10 hover:text-white"
            : "lang-trigger",
        )}
      >
        <Award className="h-4 w-4" />
        {t("nav.membership")}
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="glass-strong absolute end-0 z-50 mt-2 w-[20rem] overflow-hidden rounded-2xl p-2 shadow-card"
        >
          <p className="px-3 pb-2 pt-1 text-xs text-faint">
            {t("nav.membershipDesc")}
          </p>
          {ROLES.map(({ role, icon: Icon }) => (
            <Link
              key={role}
              href={`/membership#${role}`}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-surface/10"
            >
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-accent">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-fg">
                  {t(`auth.roles.${role}`)}
                </span>
                <span className="block text-xs leading-snug text-muted">
                  {t(`auth.roleDesc.${role}`)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
