"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  Building2,
  GraduationCap,
  Users,
  UserCircle,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import QuantumField from "@/components/visuals/QuantumField";
import { DEMO_ACCOUNTS, type Role } from "@/lib/auth";
import { cn } from "@/lib/cn";

const ROLE_ICON: Record<Role, typeof Shield> = {
  admin: Shield,
  chapter: Building2,
  center: GraduationCap,
  trainer: Users,
  student: UserCircle,
};

function LoginInner() {
  const { t } = useLocale();
  const { login, loginAsRole } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const nextPath = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await login(email, password);
    setBusy(false);
    if (res.ok) router.push(nextPath);
    else setError(t("auth.invalid"));
  }

  async function quick(role: Role) {
    setBusy(true);
    setError(null);
    const res = await loginAsRole(role);
    setBusy(false);
    if (res.ok) router.push(nextPath);
    else setError(t("auth.invalid"));
  }

  const roles: Role[] = ["admin", "chapter", "center", "trainer", "student"];
  const demoMode =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_ALLOW_DEMO_ACCOUNTS === "true";

  return (
    <div className="theme-dark relative grid min-h-screen bg-[#05060f] lg:grid-cols-2">
      {/* left: brand / visual */}
      <div className="relative hidden overflow-hidden border-e border-line/10 lg:block">
        <QuantumField className="absolute inset-0 h-full w-full opacity-60" />
        <div className="absolute inset-0 bg-quantum-radial" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo variant="full" className="logo-tone" />
          <div>
            <h2 className="max-w-md text-balance text-3xl font-bold text-fg">
              {t("hero.titleLine1")}{" "}
              <span className="gradient-text">{t("hero.titleLine2")}</span>
            </h2>
            <p className="mt-3 max-w-md text-muted">{t("hero.subtitle")}</p>
          </div>
          <p className="text-xs text-faint">{t("footer.rights")}</p>
        </div>
      </div>

      {/* right: form */}
      <div className="relative flex items-center justify-center p-6 sm:p-10">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-faint transition hover:text-quantum-cyan"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("common.backHome")}
          </Link>
          <LanguageSwitcher />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden">
            <Logo className="logo-tone" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-fg">
            {t("auth.title")}
          </h1>
          <p className="mt-1.5 text-faint">{t("auth.subtitle")}</p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-muted">
                {t("auth.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@org.com"
                className="w-full rounded-xl border border-line/10 bg-surface/5 px-4 py-3 text-fg placeholder:text-faint focus:border-quantum-cyan/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-muted">
                {t("auth.password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-line/10 bg-surface/5 px-4 py-3 text-fg placeholder:text-faint focus:border-quantum-cyan/50 focus:outline-none"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="btn-primary w-full disabled:opacity-50"
            >
              <LogIn className="h-4 w-4" />
              {busy ? t("auth.signingIn") : t("auth.signIn")}
            </button>
          </form>

          {demoMode && (
          <div className="mt-8">
            <p className="text-center text-xs uppercase tracking-wider text-faint">
              {t("auth.demoHint")}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {roles.map((role) => {
                const Icon = ROLE_ICON[role];
                const acct = DEMO_ACCOUNTS.find((a) => a.role === role);
                return (
                  <button
                    key={role}
                    onClick={() => quick(role)}
                    disabled={busy}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border border-line/10 bg-surface/5 p-3 text-start transition hover:border-quantum-cyan/40 hover:bg-surface/10 disabled:opacity-50",
                      role === "admin" && "sm:col-span-2",
                    )}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-quantum-indigo/50 to-quantum-cyan/30 text-quantum-cyan">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-fg">
                        {t(`auth.roles.${role}`)}
                      </span>
                      <span className="block truncate text-xs text-faint">
                        {acct?.email}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05060f]" />}>
      <LoginInner />
    </Suspense>
  );
}
