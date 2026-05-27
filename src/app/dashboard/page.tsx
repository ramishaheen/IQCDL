"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { AdminConsole } from "@/components/dashboard/consoles/AdminConsole";
import { ChapterConsole } from "@/components/dashboard/consoles/ChapterConsole";
import { CenterConsole } from "@/components/dashboard/consoles/CenterConsole";
import { TrainerConsole } from "@/components/dashboard/consoles/TrainerConsole";
import { StudentConsole } from "@/components/dashboard/consoles/StudentConsole";

export default function DashboardPage() {
  const { user } = useAuth();
  const { dict, t } = useLocale();
  if (!user) return null;

  const role = user.role;
  const data = dict.dashboard[role];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">
          {t("dashboard.signedInAs")} {user.email}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          {t("dashboard.welcome")}, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-slate-500">{data.title}</p>
      </div>

      {role === "admin" && <AdminConsole />}
      {role === "chapter" && <ChapterConsole />}
      {role === "center" && <CenterConsole />}
      {role === "trainer" && <TrainerConsole />}
      {role === "student" && <StudentConsole />}
    </div>
  );
}
