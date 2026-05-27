"use client";

import { useState } from "react";
import {
  Panel,
  Table,
  Td,
  EmptyRow,
  Btn,
  Modal,
  Field,
  TextInput,
  Select,
  useModal,
} from "@/components/dashboard/ui";
import { usePortal, scopeForUser, type Level } from "@/lib/portal";

export function TrainerConsole() {
  const p = usePortal();
  const { trainerId, centerId } = scopeForUser("trainer");
  const trainer = p.trainers.find((t) => t.id === trainerId);

  const students = p.students.filter((s) => s.centerId === centerId);
  const myMaterials = p.materials.filter((m) => m.kind === "trainer" && m.ownerId === trainerId);
  const myAssignments = p.assignments.filter((a) => a.trainerId === trainerId);

  const matModal = useModal();
  const asgModal = useModal();
  const [mat, setMat] = useState({ title: "", level: "foundation" as Level });
  const [asg, setAsg] = useState({ title: "", due: "", level: "foundation" as Level });

  function submitMat() {
    if (!mat.title) return;
    p.addMaterial({
      ...mat,
      kind: "trainer",
      ownerId: trainerId!,
      ownerName: trainer?.name ?? "Trainer",
    });
    matModal.hide();
    setMat({ title: "", level: "foundation" });
  }
  function submitAsg() {
    if (!asg.title || !asg.due) return;
    p.addAssignment({ ...asg, trainerId: trainerId!, centerId: centerId! });
    asgModal.hide();
    setAsg({ title: "", due: "", level: "foundation" });
  }

  return (
    <div className="space-y-5">
      <Panel
        title="My materials"
        desc="Upload your own teaching materials for your cohorts."
        action={<Btn variant="primary" onClick={matModal.show}>+ Upload material</Btn>}
      >
        <Table head={["Title", "Level"]}>
          {myMaterials.length === 0 && <EmptyRow cols={2} label="You haven't uploaded materials yet." />}
          {myMaterials.map((m) => (
            <tr key={m.id}>
              <Td className="font-medium text-slate-900">{m.title}</Td>
              <Td className="capitalize">{m.level}</Td>
            </tr>
          ))}
        </Table>
        <Modal open={matModal.open} onClose={matModal.hide} title="Upload material">
          <div className="space-y-4">
            <Field label="Title">
              <TextInput value={mat.title} onChange={(e) => setMat({ ...mat, title: e.target.value })} />
            </Field>
            <Field label="Level">
              <Select value={mat.level} onChange={(e) => setMat({ ...mat, level: e.target.value as Level })}>
                <option value="foundation">Foundation</option>
                <option value="practitioner">Practitioner</option>
              </Select>
            </Field>
            <Btn variant="primary" className="w-full" onClick={submitMat}>Upload</Btn>
          </div>
        </Modal>
      </Panel>

      <Panel title="Student progress" desc="Track and update each learner's progress.">
        <Table head={["Student #", "Name", "Level", "Progress", ""]}>
          {students.length === 0 && <EmptyRow cols={5} label="No students in your center yet." />}
          {students.map((s) => (
            <tr key={s.id}>
              <Td className="font-mono text-xs">{s.studentNumber}</Td>
              <Td className="font-medium text-slate-900">{s.name}</Td>
              <Td className="capitalize">{s.level}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-quantum-cyan to-quantum-violet" style={{ width: `${s.progress}%` }} />
                  </div>
                  <span className="text-xs tabular-nums text-slate-500">{s.progress}%</span>
                </div>
              </Td>
              <Td>
                <div className="flex justify-end gap-1">
                  <Btn variant="soft" onClick={() => p.setStudentProgress(s.id, Math.min(100, s.progress + 10))}>+10%</Btn>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>

      <Panel
        title="Assignments"
        desc="Assign work to your cohorts."
        action={<Btn variant="primary" onClick={asgModal.show}>+ Assign</Btn>}
      >
        <Table head={["Assignment", "Level", "Due"]}>
          {myAssignments.length === 0 && <EmptyRow cols={3} label="No assignments yet." />}
          {myAssignments.map((a) => (
            <tr key={a.id}>
              <Td className="font-medium text-slate-900">{a.title}</Td>
              <Td className="capitalize">{a.level}</Td>
              <Td>{a.due}</Td>
            </tr>
          ))}
        </Table>
        <Modal open={asgModal.open} onClose={asgModal.hide} title="Assign work">
          <div className="space-y-4">
            <Field label="Title">
              <TextInput value={asg.title} onChange={(e) => setAsg({ ...asg, title: e.target.value })} placeholder="e.g. Build a Bell state in Quirk" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Level">
                <Select value={asg.level} onChange={(e) => setAsg({ ...asg, level: e.target.value as Level })}>
                  <option value="foundation">Foundation</option>
                  <option value="practitioner">Practitioner</option>
                </Select>
              </Field>
              <Field label="Due date">
                <TextInput type="date" value={asg.due} onChange={(e) => setAsg({ ...asg, due: e.target.value })} />
              </Field>
            </div>
            <Btn variant="primary" className="w-full" onClick={submitAsg}>Assign</Btn>
          </div>
        </Modal>
      </Panel>
    </div>
  );
}
