"use client";

import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const { t } = useLocale();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-quantum-cyan" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center text-slate-500">
        <p>Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute left-1/2 top-0 h-64 w-[700px] -translate-x-1/2 rounded-full bg-quantum-indigo/10 blur-[120px]" />
      </div>

      {/* top bar */}
      <header className="no-print sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="logo-tone" />
            <span className="hidden rounded-full bg-quantum-violet/20 px-3 py-1 text-xs font-medium text-quantum-violet sm:inline">
              {t(`auth.roles.${user.role}`)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher compact />
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 ps-3 pe-1 sm:flex">
              <span className="text-sm text-slate-600">{user.name}</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-quantum-indigo to-quantum-cyan text-sm font-semibold text-white">
                {user.name.charAt(0)}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 hover:text-brand-600"
              aria-label={t("common.logout")}
              title={t("common.logout")}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-8">{children}</main>
    </div>
  );
}
