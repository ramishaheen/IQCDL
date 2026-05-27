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
import { usePortal, scopeForUser, type Level } from "@/lib/portal";

export function CenterConsole() {
  const p = usePortal();
  const { centerId } = scopeForUser("center");
  const center = p.centers.find((c) => c.id === centerId);
  const [tab, setTab] = useState("trainers");

  const trainers = p.trainers.filter((t) => t.centerId === centerId);
  const students = p.students.filter((s) => s.centerId === centerId);
  const bookings = p.bookings.filter((b) => b.centerId === centerId);
  const studentIds = new Set(students.map((s) => s.id));
  const certs = p.certificates.filter((c) => studentIds.has(c.studentId));

  return (
    <div>
      <p className="mb-4 text-sm text-slate-500">
        Operating as <span className="font-medium text-slate-800">{center?.name}</span>
      </p>
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "trainers", label: "Trainers" },
          { id: "students", label: "Students" },
          { id: "exams", label: "Exam bookings" },
          { id: "certs", label: "Certificates" },
        ]}
      />

      {tab === "trainers" && <CenterTrainers centerId={centerId!} trainers={trainers} />}
      {tab === "students" && <CenterStudents centerId={centerId!} students={students} />}
      {tab === "exams" && <CenterExams centerId={centerId!} bookings={bookings} />}
      {tab === "certs" && (
        <Panel title="Issued certificates" desc="Certificates earned by your students.">
          <Table head={["Student", "Student #", "Level", "Token", "Status"]}>
            {certs.length === 0 && <EmptyRow cols={5} label="No certificates issued yet." />}
            {certs.map((c) => (
              <tr key={c.id}>
                <Td className="font-medium text-slate-900">{c.studentName}</Td>
                <Td className="font-mono text-xs">{c.studentNumber}</Td>
                <Td className="capitalize">{c.level}</Td>
                <Td className="font-mono text-xs text-brand-700">{c.token}</Td>
                <Td><StatusBadge status={c.status} /></Td>
              </tr>
            ))}
          </Table>
        </Panel>
      )}
    </div>
  );
}

function CenterTrainers({
  centerId,
  trainers,
}: {
  centerId: string;
  trainers: ReturnType<typeof usePortal>["trainers"];
}) {
  const p = usePortal();
  const m = useModal();
  const [form, setForm] = useState({ name: "", email: "" });

  function submit() {
    if (!form.name || !form.email) return;
    p.addTrainer({ ...form, centerId });
    m.hide();
    setForm({ name: "", email: "" });
  }

  return (
    <Panel
      title="Trainers"
      desc="Add trainers; admin approves them before they can deliver."
      action={<Btn variant="primary" onClick={m.show}>+ Add trainer</Btn>}
    >
      <Table head={["Trainer", "Email", "Status"]}>
        {trainers.length === 0 && <EmptyRow cols={3} label="No trainers yet." />}
        {trainers.map((t) => (
          <tr key={t.id}>
            <Td className="font-medium text-slate-900">{t.name}</Td>
            <Td>{t.email}</Td>
            <Td><StatusBadge status={t.status} /></Td>
          </tr>
        ))}
      </Table>
      <Modal open={m.open} onClose={m.hide} title="Add trainer">
        <div className="space-y-4">
          <Field label="Full name">
            <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Email">
            <TextInput type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <p className="text-xs text-slate-500">New trainers start as “pending” until an administrator approves them.</p>
          <Btn variant="primary" className="w-full" onClick={submit}>Add trainer</Btn>
        </div>
      </Modal>
    </Panel>
  );
}

function CenterStudents({
  centerId,
  students,
}: {
  centerId: string;
  students: ReturnType<typeof usePortal>["students"];
}) {
  const p = usePortal();
  const m = useModal();
  const [form, setForm] = useState({ name: "", email: "", level: "foundation" as Level });

  function submit() {
    if (!form.name || !form.email) return;
    p.addStudent({ name: form.name, email: form.email, centerId, level: form.level });
    m.hide();
    setForm({ name: "", email: "", level: "foundation" });
  }

  return (
    <Panel
      title="Students"
      desc="Register students under your center."
      action={<Btn variant="primary" onClick={m.show}>+ Register student</Btn>}
    >
      <Table head={["Student #", "Name", "Level", "Progress"]}>
        {students.length === 0 && <EmptyRow cols={4} label="No students registered yet." />}
        {students.map((s) => (
          <tr key={s.id}>
            <Td className="font-mono text-xs text-slate-900">{s.studentNumber}</Td>
            <Td className="font-medium text-slate-900">{s.name}</Td>
            <Td className="capitalize">{s.level}</Td>
            <Td>{s.progress}%</Td>
          </tr>
        ))}
      </Table>
      <Modal open={m.open} onClose={m.hide} title="Register student">
        <div className="space-y-4">
          <Field label="Full name">
            <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Email">
            <TextInput type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field label="Level">
            <Select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as Level })}>
              <option value="foundation">Foundation</option>
              <option value="practitioner">Practitioner</option>
            </Select>
          </Field>
          <Btn variant="primary" className="w-full" onClick={submit}>Register</Btn>
        </div>
      </Modal>
    </Panel>
  );
}

function CenterExams({
  centerId,
  bookings,
}: {
  centerId: string;
  bookings: ReturnType<typeof usePortal>["bookings"];
}) {
  const p = usePortal();
  const m = useModal();
  const [form, setForm] = useState({ level: "foundation" as Level, date: "", time: "10:00", seats: 20 });

  function submit() {
    if (!form.date) return;
    p.bookExam({ centerId, ...form });
    m.hide();
  }

  return (
    <Panel
      title="Exam bookings"
      desc="Book exam timings; bookings await admin approval."
      action={<Btn variant="primary" onClick={m.show}>+ Book exam</Btn>}
    >
      <Table head={["Level", "Date", "Time", "Seats", "Status"]}>
        {bookings.length === 0 && <EmptyRow cols={5} label="No bookings yet." />}
        {bookings.map((b) => (
          <tr key={b.id}>
            <Td className="capitalize font-medium text-slate-900">{b.level}</Td>
            <Td>{b.date}</Td>
            <Td>{b.time}</Td>
            <Td>{b.seats}</Td>
            <Td><StatusBadge status={b.status} /></Td>
          </tr>
        ))}
      </Table>
      <Modal open={m.open} onClose={m.hide} title="Book exam timing">
        <div className="space-y-4">
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
          <Btn variant="primary" className="w-full" onClick={submit}>Request booking</Btn>
        </div>
      </Modal>
    </Panel>
  );
}
