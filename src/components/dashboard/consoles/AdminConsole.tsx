"use client";

import { useState } from "react";
import {
  Panel,
  Table,
  Td,
  EmptyRow,
  StatusBadge,
  Btn,
  Modal,
  Field,
  TextInput,
  Select,
  Tabs,
  useModal,
} from "@/components/dashboard/ui";
import { usePortal, CONTINENTS, type Level } from "@/lib/portal";

export function AdminConsole() {
  const p = usePortal();
  const [tab, setTab] = useState("approvals");
  const centerName = (id: string) => p.centers.find((c) => c.id === id)?.name ?? "—";

  return (
    <div>
      <div className="mb-2 flex items-center justify-end">
        <button
          onClick={() => {
            if (confirm("Reset all portal data back to the demo seed?")) p.reset();
          }}
          className="rounded-full border border-line/10 bg-surface/5 px-3 py-1.5 text-xs font-medium text-faint transition hover:bg-surface/10 hover:text-fg"
        >
          Reset demo data
        </button>
      </div>
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "approvals", label: "Approvals" },
          { id: "network", label: "Centers & students" },
          { id: "exams", label: "Exams & monitoring" },
          { id: "content", label: "Content & comms" },
        ]}
      />

      {tab === "approvals" && (
        <div className="space-y-5">
          <ApprovalTable
            title="Chapters"
            desc="Approve regional chapters."
            head={["Chapter", "Continent", "Status", ""]}
            rows={p.chapters}
            render={(c) => [c.name, c.continent]}
            onApprove={(id) => p.setChapterStatus(id, "approved")}
            onReject={(id) => p.setChapterStatus(id, "rejected")}
          />
          <ApprovalTable
            title="Centers"
            desc="Approve training centers."
            head={["Center", "Country", "Status", ""]}
            rows={p.centers}
            render={(c) => [c.name, c.country]}
            onApprove={(id) => p.setCenterStatus(id, "approved")}
            onReject={(id) => p.setCenterStatus(id, "rejected")}
          />
          <ApprovalTable
            title="Trainers"
            desc="Approve trainers for centers."
            head={["Trainer", "Center", "Status", ""]}
            rows={p.trainers}
            render={(t) => [t.name, centerName(t.centerId)]}
            onApprove={(id) => p.setTrainerStatus(id, "approved")}
            onReject={(id) => p.setTrainerStatus(id, "rejected")}
          />
        </div>
      )}

      {tab === "network" && (
        <div className="space-y-5">
          <CreateCenterPanel />
          <AddStudentPanel />
        </div>
      )}

      {tab === "exams" && <AdminExamsPanel />}

      {tab === "content" && (
        <div className="space-y-5">
          <GuidedMaterialPanel />
          <AnnouncementPanel />
          <EmailPanel />
        </div>
      )}
    </div>
  );
}

/* ---------- Approvals ---------- */
function ApprovalTable<T extends { id: string; status: string }>({
  title,
  desc,
  head,
  rows,
  render,
  onApprove,
  onReject,
}: {
  title: string;
  desc: string;
  head: string[];
  rows: T[];
  render: (row: T) => string[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <Panel title={title} desc={desc}>
      <Table head={head}>
        {rows.length === 0 && <EmptyRow cols={head.length} label="Nothing here yet." />}
        {rows.map((row) => {
          const cells = render(row);
          return (
            <tr key={row.id}>
              {cells.map((c, i) => (
                <Td key={i} className={i === 0 ? "font-medium text-slate-900" : ""}>
                  {c}
                </Td>
              ))}
              <Td>
                <StatusBadge status={row.status} />
              </Td>
              <Td>
                {row.status !== "approved" && (
                  <div className="flex justify-end gap-2">
                    <Btn variant="soft" onClick={() => onApprove(row.id)}>
                      Approve
                    </Btn>
                    {row.status !== "rejected" && (
                      <Btn variant="danger" onClick={() => onReject(row.id)}>
                        Reject
                      </Btn>
                    )}
                  </div>
                )}
              </Td>
            </tr>
          );
        })}
      </Table>
    </Panel>
  );
}

/* ---------- Create center ---------- */
function CreateCenterPanel() {
  const p = usePortal();
  const m = useModal();
  const [form, setForm] = useState({
    name: "",
    country: "",
    continent: CONTINENTS[0],
    chapterId: p.chapters[0]?.id ?? "",
  });

  function submit() {
    if (!form.name || !form.country) return;
    p.addCenter(form);
    m.hide();
    setForm({ name: "", country: "", continent: CONTINENTS[0], chapterId: p.chapters[0]?.id ?? "" });
  }

  return (
    <Panel
      title="Training centers"
      desc="Create and oversee centers worldwide."
      action={<Btn variant="primary" onClick={m.show}>+ Create center</Btn>}
    >
      <Table head={["Center", "Country", "Continent", "Chapter", "Status"]}>
        {p.centers.map((c) => (
          <tr key={c.id}>
            <Td className="font-medium text-slate-900">{c.name}</Td>
            <Td>{c.country}</Td>
            <Td>{c.continent}</Td>
            <Td>{p.chapters.find((ch) => ch.id === c.chapterId)?.name ?? "—"}</Td>
            <Td><StatusBadge status={c.status} /></Td>
          </tr>
        ))}
      </Table>

      <Modal open={m.open} onClose={m.hide} title="Create training center">
        <div className="space-y-4">
          <Field label="Center name">
            <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Quantum Academy Dubai" />
          </Field>
          <Field label="Country">
            <TextInput value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Continent">
              <Select value={form.continent} onChange={(e) => setForm({ ...form, continent: e.target.value })}>
                {CONTINENTS.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Chapter">
              <Select value={form.chapterId} onChange={(e) => setForm({ ...form, chapterId: e.target.value })}>
                {p.chapters.map((ch) => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
              </Select>
            </Field>
          </div>
          <Btn variant="primary" className="w-full" onClick={submit}>Create center</Btn>
        </div>
      </Modal>
    </Panel>
  );
}

/* ---------- Add student (incl. self-paced) ---------- */
function AddStudentPanel() {
  const p = usePortal();
  const m = useModal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    centerId: p.centers[0]?.id ?? "",
    selfPaced: false,
    level: "foundation" as Level,
  });

  function submit() {
    if (!form.name || !form.email) return;
    p.addStudent({
      name: form.name,
      email: form.email,
      centerId: form.selfPaced ? null : form.centerId,
      level: form.level,
    });
    m.hide();
    setForm({ name: "", email: "", centerId: p.centers[0]?.id ?? "", selfPaced: false, level: "foundation" });
  }

  return (
    <Panel
      title="Students"
      desc="Add students to a center or enroll self-paced learners."
      action={<Btn variant="primary" onClick={m.show}>+ Add student</Btn>}
    >
      <Table head={["Student #", "Name", "Mode", "Level", "Progress"]}>
        {p.students.map((s) => (
          <tr key={s.id}>
            <Td className="font-mono text-xs text-slate-900">{s.studentNumber}</Td>
            <Td className="font-medium text-slate-900">{s.name}</Td>
            <Td>{s.selfPaced ? "Self-paced" : p.centers.find((c) => c.id === s.centerId)?.name ?? "—"}</Td>
            <Td className="capitalize">{s.level}</Td>
            <Td>{s.progress}%</Td>
          </tr>
        ))}
      </Table>

      <Modal open={m.open} onClose={m.hide} title="Add student">
        <div className="space-y-4">
          <Field label="Full name">
            <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Email">
            <TextInput type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.selfPaced} onChange={(e) => setForm({ ...form, selfPaced: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-brand-500" />
            Self-paced (no center)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Center">
              <Select disabled={form.selfPaced} value={form.centerId} onChange={(e) => setForm({ ...form, centerId: e.target.value })}>
                {p.centers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
            <Field label="Level">
              <Select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as Level })}>
                <option value="foundation">Foundation</option>
                <option value="practitioner">Practitioner</option>
              </Select>
            </Field>
          </div>
          <Btn variant="primary" className="w-full" onClick={submit}>Add student</Btn>
        </div>
      </Modal>
    </Panel>
  );
}

/* ---------- Exams & monitoring ---------- */
function AdminExamsPanel() {
  const p = usePortal();
  const m = useModal();
  const centerName = (id: string) => p.centers.find((c) => c.id === id)?.name ?? "—";
  const [form, setForm] = useState({
    centerId: p.centers[0]?.id ?? "",
    level: "foundation" as Level,
    date: "",
    time: "10:00",
    seats: 20,
  });

  function submit() {
    if (!form.date) return;
    p.bookExam(form);
    m.hide();
  }

  const running = p.bookings.filter((b) => b.status === "running");

  return (
    <div className="space-y-5">
      {running.length > 0 && (
        <Panel title="Live exam monitoring" desc="Exams currently in progress.">
          <div className="grid gap-3 sm:grid-cols-2">
            {running.map((b) => (
              <div key={b.id} className="rounded-xl border border-brand-200 bg-brand-50/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">{centerName(b.centerId)}</span>
                  <StatusBadge status="running" />
                </div>
                <p className="mt-1 text-sm capitalize text-slate-600">{b.level} · {b.seats} seats · {b.date} {b.time}</p>
                <div className="mt-3">
                  <Btn variant="soft" onClick={() => p.setBookingStatus(b.id, "completed")}>End & mark completed</Btn>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      <Panel
        title="Exam bookings"
        desc="Book exams for any center, approve requests, and start monitoring."
        action={<Btn variant="primary" onClick={m.show}>+ Book exam</Btn>}
      >
        <Table head={["Center", "Level", "Date", "Time", "Seats", "Status", ""]}>
          {p.bookings.map((b) => (
            <tr key={b.id}>
              <Td className="font-medium text-slate-900">{centerName(b.centerId)}</Td>
              <Td className="capitalize">{b.level}</Td>
              <Td>{b.date}</Td>
              <Td>{b.time}</Td>
              <Td>{b.seats}</Td>
              <Td><StatusBadge status={b.status} /></Td>
              <Td>
                <div className="flex justify-end gap-2">
                  {b.status === "pending" && (
                    <Btn variant="soft" onClick={() => p.setBookingStatus(b.id, "approved")}>Approve</Btn>
                  )}
                  {b.status === "approved" && (
                    <Btn variant="soft" onClick={() => p.setBookingStatus(b.id, "running")}>Start</Btn>
                  )}
                  {b.status === "running" && (
                    <Btn variant="soft" onClick={() => p.setBookingStatus(b.id, "completed")}>Complete</Btn>
                  )}
                </div>
              </Td>
            </tr>
          ))}
        </Table>

        <Modal open={m.open} onClose={m.hide} title="Book an exam">
          <div className="space-y-4">
            <Field label="Center">
              <Select value={form.centerId} onChange={(e) => setForm({ ...form, centerId: e.target.value })}>
                {p.centers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Level">
                <Select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as Level })}>
                  <option value="foundation">Foundation</option>
                  <option value="practitioner">Practitioner</option>
                </Select>
              </Field>
              <Field label="Seats">
                <TextInput type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date">
                <TextInput type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </Field>
              <Field label="Time">
                <TextInput type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
              </Field>
            </div>
            <Btn variant="primary" className="w-full" onClick={submit}>Book exam</Btn>
          </div>
        </Modal>
      </Panel>
    </div>
  );
}

/* ---------- Guided materials ---------- */
function GuidedMaterialPanel() {
  const p = usePortal();
  const m = useModal();
  const [form, setForm] = useState({ title: "", level: "foundation" as Level });
  const guided = p.materials.filter((mat) => mat.kind === "guided");

  function submit() {
    if (!form.title) return;
    p.addMaterial({ ...form, kind: "guided", ownerId: "u-admin", ownerName: "IQCDL" });
    m.hide();
    setForm({ title: "", level: "foundation" });
  }

  return (
    <Panel
      title="Guided learning materials"
      desc="Upload official curriculum content for all centers."
      action={<Btn variant="primary" onClick={m.show}>+ Upload material</Btn>}
    >
      <Table head={["Title", "Level"]}>
        {guided.length === 0 && <EmptyRow cols={2} label="No guided materials yet." />}
        {guided.map((mat) => (
          <tr key={mat.id}>
            <Td className="font-medium text-slate-900">{mat.title}</Td>
            <Td className="capitalize">{mat.level}</Td>
          </tr>
        ))}
      </Table>
      <Modal open={m.open} onClose={m.hide} title="Upload guided material">
        <div className="space-y-4">
          <Field label="Title">
            <TextInput value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Foundation Day 2 — The Quantum Threat" />
          </Field>
          <Field label="Level">
            <Select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as Level })}>
              <option value="foundation">Foundation</option>
              <option value="practitioner">Practitioner</option>
            </Select>
          </Field>
          <Btn variant="primary" className="w-full" onClick={submit}>Upload</Btn>
        </div>
      </Modal>
    </Panel>
  );
}

/* ---------- Announcements ---------- */
function AnnouncementPanel() {
  const p = usePortal();
  const m = useModal();
  const [form, setForm] = useState({ audience: "centers" as "centers" | "chapters" | "all", title: "", body: "" });

  function submit() {
    if (!form.title) return;
    p.addAnnouncement(form);
    m.hide();
    setForm({ audience: "centers", title: "", body: "" });
  }

  return (
    <Panel
      title="Announcements"
      desc="Broadcast to centers and chapters."
      action={<Btn variant="primary" onClick={m.show}>+ New announcement</Btn>}
    >
      <div className="space-y-3">
        {p.announcements.length === 0 && <p className="py-4 text-center text-sm text-slate-400">No announcements yet.</p>}
        {p.announcements.map((a) => (
          <div key={a.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-slate-900">{a.title}</span>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs capitalize text-brand-700">{a.audience}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{a.body}</p>
            <p className="mt-2 text-xs text-slate-400">{a.date}</p>
          </div>
        ))}
      </div>
      <Modal open={m.open} onClose={m.hide} title="New announcement">
        <div className="space-y-4">
          <Field label="Audience">
            <Select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value as typeof form.audience })}>
              <option value="centers">Centers</option>
              <option value="chapters">Chapters</option>
              <option value="all">Everyone</option>
            </Select>
          </Field>
          <Field label="Title">
            <TextInput value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Message">
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-400 focus:outline-none"
            />
          </Field>
          <Btn variant="primary" className="w-full" onClick={submit}>Publish</Btn>
        </div>
      </Modal>
    </Panel>
  );
}

/* ---------- Email students ---------- */
function EmailPanel() {
  const p = usePortal();
  const m = useModal();
  const [form, setForm] = useState({
    segment: "all students",
    email: "",
    subject: "",
    body: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function submit() {
    if (!form.subject || !form.email) return;
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: form.email, subject: form.subject, body: form.body }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        p.sendEmail({
          to: `${form.segment} · ${form.email}`,
          subject: form.subject,
          body: form.body,
        });
        setStatus(
          data.mode === "live"
            ? "Sent via Resend ✓"
            : "Logged (no RESEND_API_KEY set) ✓",
        );
        setForm({ segment: "all students", email: "", subject: "", body: "" });
        setTimeout(() => {
          m.hide();
          setStatus(null);
        }, 900);
      } else {
        setStatus(data.error || "Failed to send");
      }
    } catch {
      setStatus("Network error");
    } finally {
      setSending(false);
    }
  }

  return (
    <Panel
      title="Email students"
      desc="Send real emails via Resend (logged when no key is configured)."
      action={<Btn variant="primary" onClick={m.show}>+ Compose email</Btn>}
    >
      <Table head={["To", "Subject", "Sent"]}>
        {p.emails.length === 0 && <EmptyRow cols={3} label="No emails sent yet." />}
        {p.emails.map((e) => (
          <tr key={e.id}>
            <Td>{e.to}</Td>
            <Td className="font-medium text-slate-900">{e.subject}</Td>
            <Td>{e.date}</Td>
          </tr>
        ))}
      </Table>
      <Modal open={m.open} onClose={m.hide} title="Compose email">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Segment">
              <Select value={form.segment} onChange={(e) => setForm({ ...form, segment: e.target.value })}>
                <option>all students</option>
                <option>foundation students</option>
                <option>practitioner students</option>
                <option>self-paced students</option>
              </Select>
            </Field>
            <Field label="Recipient email">
              <TextInput
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@org.com"
              />
            </Field>
          </div>
          <Field label="Subject">
            <TextInput value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </Field>
          <Field label="Message">
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-400 focus:outline-none"
            />
          </Field>
          {status && <p className="text-sm text-brand-700">{status}</p>}
          <Btn variant="primary" className="w-full" onClick={submit} disabled={sending}>
            {sending ? "Sending…" : "Send"}
          </Btn>
        </div>
      </Modal>
    </Panel>
  );
}
