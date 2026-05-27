"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Award,
  ClipboardList,
  ArrowRight,
  BadgeCheck,
  Hash,
} from "lucide-react";
import { Panel, Table, Td, EmptyRow } from "@/components/dashboard/ui";
import { usePortal, scopeForUser } from "@/lib/portal";

export function StudentConsole() {
  const p = usePortal();
  const { studentId } = scopeForUser("student");
  const student = p.students.find((s) => s.id === studentId);
  const cert = student ? p.certByStudentId(student.id) : undefined;
  const assignments = p.assignments.filter((a) => a.centerId === student?.centerId);
  const materials = p.materials.filter(
    (m) => m.kind === "guided" || student?.centerId,
  );

  const links = [
    { label: "Continue learning", href: "/programs", icon: BookOpen },
    { label: "Practice exam", href: "/dashboard/exam", icon: FileText },
    { label: "Readiness assessment", href: "/assessment", icon: ClipboardList },
    { label: "My certificate", href: "/dashboard/certificate", icon: Award },
  ];

  return (
    <div className="space-y-5">
      {/* identity + progress */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500">
            <Hash className="h-3.5 w-3.5" /> Student number
          </span>
          <p className="mt-1 font-mono text-lg font-semibold text-slate-900">
            {student?.studentNumber ?? "—"}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Level</p>
          <p className="mt-1 text-lg font-semibold capitalize text-slate-900">
            {student?.level ?? "—"}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Course progress</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{student?.progress ?? 0}%</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-quantum-cyan to-quantum-violet"
              initial={{ width: 0 }}
              animate={{ width: `${student?.progress ?? 0}%` }}
              transition={{ duration: 0.9 }}
            />
          </div>
        </div>
      </div>

      {/* quick links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <Link key={l.href} href={l.href} className="card group flex items-center justify-between gap-3 p-5 transition hover:border-brand-300 hover:shadow-glow">
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-quantum-indigo/40 to-quantum-cyan/30 text-quantum-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-medium text-slate-900">{l.label}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-quantum-cyan rtl:rotate-180" />
            </Link>
          );
        })}
      </div>

      {/* certificate token */}
      {cert && (
        <Panel title="My certificate" desc="Your credential is verifiable by its tokenization number.">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-200 bg-brand-50/60 p-4">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <BadgeCheck className="h-4 w-4 text-brand-600" />
                {cert.level === "practitioner" ? "Practitioner" : "Foundation"} Level
              </p>
              <p className="mt-1 text-xs text-slate-500">Verification token</p>
              <p className="font-mono text-sm font-semibold text-brand-700">{cert.token}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard/certificate" className="btn-ghost">View</Link>
              <Link href={`/verify?token=${encodeURIComponent(cert.token)}`} className="btn-primary">
                Verify
              </Link>
            </div>
          </div>
        </Panel>
      )}

      {/* assignments */}
      <Panel title="Assignments" desc="Work assigned by your trainer.">
        <Table head={["Assignment", "Level", "Due"]}>
          {assignments.length === 0 && <EmptyRow cols={3} label="No assignments yet." />}
          {assignments.map((a) => (
            <tr key={a.id}>
              <Td className="font-medium text-slate-900">{a.title}</Td>
              <Td className="capitalize">{a.level}</Td>
              <Td>{a.due}</Td>
            </tr>
          ))}
        </Table>
      </Panel>

      {/* materials */}
      <Panel title="Learning materials" desc="Guided curriculum and your trainer's uploads.">
        <Table head={["Title", "Type", "Level"]}>
          {materials.length === 0 && <EmptyRow cols={3} label="No materials available yet." />}
          {materials.map((m) => (
            <tr key={m.id}>
              <Td className="font-medium text-slate-900">{m.title}</Td>
              <Td className="capitalize">{m.kind === "guided" ? "Guided" : "Trainer"}</Td>
              <Td className="capitalize">{m.level}</Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}
