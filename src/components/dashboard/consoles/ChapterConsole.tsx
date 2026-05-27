"use client";

import {
  Panel,
  Table,
  Td,
  EmptyRow,
  StatusBadge,
  Btn,
} from "@/components/dashboard/ui";
import { usePortal, scopeForUser } from "@/lib/portal";

export function ChapterConsole() {
  const p = usePortal();
  const { chapterId } = scopeForUser("chapter");
  const chapter = p.chapters.find((c) => c.id === chapterId);
  const continent = chapter?.continent;

  // A chapter controls any center in its continent.
  const centers = p.centers.filter((c) => c.continent === continent);
  const centerIds = new Set(centers.map((c) => c.id));
  const trainers = p.trainers.filter((t) => centerIds.has(t.centerId));
  const students = p.students.filter((s) => s.centerId && centerIds.has(s.centerId));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Metric label="Centers" value={centers.length} />
        <Metric label="Trainers" value={trainers.length} />
        <Metric label="Students" value={students.length} />
        <Metric label="Continent" value={continent ?? "—"} />
      </div>

      <Panel
        title={`Centers in ${continent}`}
        desc="Approve and oversee every center across your continent."
      >
        <Table head={["Center", "Country", "Status", ""]}>
          {centers.length === 0 && <EmptyRow cols={4} label="No centers in this continent yet." />}
          {centers.map((c) => (
            <tr key={c.id}>
              <Td className="font-medium text-slate-900">{c.name}</Td>
              <Td>{c.country}</Td>
              <Td><StatusBadge status={c.status} /></Td>
              <Td>
                {c.status !== "approved" && (
                  <div className="flex justify-end gap-2">
                    <Btn variant="soft" onClick={() => p.setCenterStatus(c.id, "approved")}>Approve</Btn>
                    <Btn variant="danger" onClick={() => p.setCenterStatus(c.id, "rejected")}>Reject</Btn>
                  </div>
                )}
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>

      <Panel title="Trainers in continent" desc="Trainers registered across your centers.">
        <Table head={["Trainer", "Center", "Status"]}>
          {trainers.length === 0 && <EmptyRow cols={3} label="No trainers yet." />}
          {trainers.map((t) => (
            <tr key={t.id}>
              <Td className="font-medium text-slate-900">{t.name}</Td>
              <Td>{p.centers.find((c) => c.id === t.centerId)?.name ?? "—"}</Td>
              <Td><StatusBadge status={t.status} /></Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card p-5">
      <p className="font-display text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{label}</p>
    </div>
  );
}
