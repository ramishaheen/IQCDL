"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

export function Navbar() {
  const { t, dict } = useLocale();
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
    { href: "/why-quantum-ai", label: t("nav.why") },
    { href: "/programs", label: t("nav.program") },
    { href: "/assessment", label: t("nav.assessment") },
    { href: "/roadmap", label: t("nav.roadmap") },
    { href: "/standards", label: t("nav.standards") },
    { href: "/about", label: t("nav.about") },
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
            "flex items-center justify-between rounded-2xl px-4 py-2.5 glass-strong transition-all duration-300",
            scrolled ? "shadow-card" : "shadow-sm",
          )}
        >
          <Logo className="logo-tone" />

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition hover:bg-surface/5 hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            {user ? (
              <Link href="/dashboard" className="btn-primary hidden sm:inline-flex">
                <LayoutDashboard className="h-4 w-4" />
                {t("common.dashboard")}
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn-ghost hidden sm:inline-flex">
                  {t("common.login")}
                </Link>
                <Link href="/membership" className="btn-primary hidden sm:inline-flex">
                  {dict.membership.enroll}
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line/10 bg-surface/5 text-fg lg:hidden"
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
                className="block rounded-xl px-4 py-3 text-sm font-medium text-fg hover:bg-surface/5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/membership"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-fg hover:bg-surface/5"
            >
              {t("nav.membership")}
            </Link>
            <div className="mt-2 flex items-center gap-2 border-t border-line/10 pt-3">
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
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="btn-ghost flex-1"
                  >
                    {t("common.login")}
                  </Link>
                  <Link
                    href="/membership"
                    onClick={() => setOpen(false)}
                    className="btn-primary flex-1"
                  >
                    {dict.membership.enroll}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
