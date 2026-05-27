"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

export function Navbar() {
  const { t } = useLocale();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/programs", label: t("nav.program") },
    { href: "/assessment", label: t("nav.assessment") },
    { href: "/roadmap", label: t("nav.roadmap") },
    { href: "/standards", label: t("nav.standards") },
    { href: "/#pricing", label: t("nav.pricing") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container-x">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass-strong shadow-card" : "border border-transparent",
          )}
        >
          <Logo className="text-sky-300" />

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-quantum-cyan"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            {user ? (
              <Link href="/dashboard" className="btn-primary hidden sm:inline-flex">
                <LayoutDashboard className="h-4 w-4" />
                {t("common.dashboard")}
              </Link>
            ) : (
              <Link href="/login" className="btn-ghost hidden sm:inline-flex">
                {t("common.login")}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass-strong mt-2 rounded-2xl p-3 shadow-card lg:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
              <LanguageSwitcher />
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="btn-primary flex-1"
                >
                  {t("common.dashboard")}
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="btn-primary flex-1"
                >
                  {t("common.login")}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
