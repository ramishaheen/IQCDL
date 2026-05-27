"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Role } from "@/lib/auth";

export type ApprovalStatus = "pending" | "approved" | "rejected";
export type Level = "foundation" | "practitioner";
export type ExamStatus = "pending" | "approved" | "running" | "completed";

export interface Chapter {
  id: string;
  name: string;
  continent: string;
  status: ApprovalStatus;
}
export interface Center {
  id: string;
  name: string;
  country: string;
  continent: string;
  chapterId: string;
  status: ApprovalStatus;
}
export interface Trainer {
  id: string;
  name: string;
  email: string;
  centerId: string;
  status: ApprovalStatus;
}
export interface Student {
  id: string;
  studentNumber: string;
  name: string;
  email: string;
  centerId: string | null; // null => self-paced
  selfPaced: boolean;
  level: Level;
  progress: number; // 0..100
}
export interface ExamBooking {
  id: string;
  centerId: string;
  level: Level;
  date: string;
  time: string;
  seats: number;
  status: ExamStatus;
}
export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  level: Level;
  token: string;
  issuedAt: string;
  expiresAt: string;
  status: "valid" | "revoked";
}
export interface Material {
  id: string;
  title: string;
  level: Level;
  kind: "guided" | "trainer";
  ownerId: string;
  ownerName: string;
}
export interface Announcement {
  id: string;
  audience: "chapters" | "centers" | "all";
  title: string;
  body: string;
  date: string;
}
export interface Assignment {
  id: string;
  trainerId: string;
  centerId: string;
  title: string;
  due: string;
  level: Level;
}
export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  body: string;
  date: string;
}

interface PortalData {
  chapters: Chapter[];
  centers: Center[];
  trainers: Trainer[];
  students: Student[];
  bookings: ExamBooking[];
  certificates: Certificate[];
  materials: Material[];
  announcements: Announcement[];
  assignments: Assignment[];
  emails: EmailLog[];
}

export const CONTINENTS = ["Africa", "Asia", "Europe", "Americas", "Oceania"];

// Deterministic seed (fixed ids/dates) so SSR and first client render match.
const SEED: PortalData = {
  chapters: [
    { id: "ch-1", name: "Middle East & Africa Chapter", continent: "Africa", status: "approved" },
    { id: "ch-2", name: "Europe Chapter", continent: "Europe", status: "approved" },
    { id: "ch-3", name: "Asia-Pacific Chapter", continent: "Asia", status: "pending" },
  ],
  centers: [
    { id: "c-1", name: "Quantum Academy Riyadh", country: "Saudi Arabia", continent: "Africa", chapterId: "ch-1", status: "approved" },
    { id: "c-2", name: "Cairo Cyber Institute", country: "Egypt", continent: "Africa", chapterId: "ch-1", status: "approved" },
    { id: "c-3", name: "Berlin Quantum Lab", country: "Germany", continent: "Europe", chapterId: "ch-2", status: "pending" },
  ],
  trainers: [
    { id: "tr-1", name: "Lead Trainer", email: "trainer@iqcdl.org", centerId: "c-1", status: "approved" },
    { id: "tr-2", name: "Omar Said", email: "omar@quantum.sa", centerId: "c-1", status: "pending" },
    { id: "tr-3", name: "Lena Vogel", email: "lena@bqlab.de", centerId: "c-3", status: "pending" },
  ],
  students: [
    { id: "s-1", studentNumber: "IQ-2026-100023", name: "Aisha Q.", email: "student@iqcdl.org", centerId: "c-1", selfPaced: false, level: "foundation", progress: 64 },
    { id: "s-2", studentNumber: "IQ-2026-100024", name: "Yusuf Karim", email: "yusuf@mail.com", centerId: "c-1", selfPaced: false, level: "foundation", progress: 38 },
    { id: "s-3", studentNumber: "IQ-2026-100025", name: "Maria Lopez", email: "maria@mail.com", centerId: null, selfPaced: true, level: "practitioner", progress: 12 },
  ],
  bookings: [
    { id: "bk-1", centerId: "c-1", level: "foundation", date: "2026-06-18", time: "10:00", seats: 20, status: "approved" },
    { id: "bk-2", centerId: "c-2", level: "foundation", date: "2026-06-25", time: "13:00", seats: 15, status: "pending" },
    { id: "bk-3", centerId: "c-1", level: "practitioner", date: "2026-05-27", time: "09:00", seats: 12, status: "running" },
  ],
  certificates: [
    {
      id: "cert-1",
      studentId: "s-9",
      studentName: "Khalid N.",
      studentNumber: "IQ-2025-100001",
      level: "foundation",
      token: "IQCDL-FND-2025-7H3KQ2",
      issuedAt: "2025-11-02",
      expiresAt: "2028-11-02",
      status: "valid",
    },
  ],
  materials: [
    { id: "m-1", title: "Foundation Day 1 — Quantum Basics (Guided)", level: "foundation", kind: "guided", ownerId: "u-admin", ownerName: "IQCDL" },
  ],
  announcements: [
    { id: "a-1", audience: "centers", title: "Q3 exam window open", body: "Exam bookings for July–September are now open. Submit center schedules for approval.", date: "2026-05-20" },
  ],
  assignments: [],
  emails: [],
};

const STORAGE_KEY = "iqcdl_portal_v1";

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
function today(): string {
  return new Date().toISOString().slice(0, 10);
}
function plusYears(iso: string, years: number): string {
  const d = new Date(iso);
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString().slice(0, 10);
}
export function makeStudentNumber(seq: number): string {
  return `IQ-${new Date().getFullYear()}-${(100000 + seq).toString()}`;
}
export function makeToken(level: Level): string {
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `IQCDL-${level === "practitioner" ? "PRC" : "FND"}-${new Date().getFullYear()}-${code}`;
}

interface PortalContextValue extends PortalData {
  // chapters
  addChapter: (name: string, continent: string) => void;
  setChapterStatus: (id: string, status: ApprovalStatus) => void;
  // centers
  addCenter: (input: { name: string; country: string; continent: string; chapterId: string }) => void;
  setCenterStatus: (id: string, status: ApprovalStatus) => void;
  // trainers
  addTrainer: (input: { name: string; email: string; centerId: string }) => void;
  setTrainerStatus: (id: string, status: ApprovalStatus) => void;
  // students
  addStudent: (input: { name: string; email: string; centerId: string | null; level: Level }) => Student;
  setStudentProgress: (id: string, progress: number) => void;
  // exams
  bookExam: (input: { centerId: string; level: Level; date: string; time: string; seats: number }) => void;
  setBookingStatus: (id: string, status: ExamStatus) => void;
  // certificates
  issueCertificate: (studentId: string, level: Level) => Certificate | null;
  revokeCertificate: (id: string) => void;
  certByToken: (token: string) => Certificate | undefined;
  certByStudentId: (studentId: string) => Certificate | undefined;
  // materials / announcements / assignments / email
  addMaterial: (input: { title: string; level: Level; kind: "guided" | "trainer"; ownerId: string; ownerName: string }) => void;
  addAnnouncement: (input: { audience: "chapters" | "centers" | "all"; title: string; body: string }) => void;
  addAssignment: (input: { trainerId: string; centerId: string; title: string; due: string; level: Level }) => void;
  sendEmail: (input: { to: string; subject: string; body: string }) => void;
  reset: () => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortalData>(SEED);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as PortalData);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data, hydrated]);

  const update = useCallback(
    (fn: (d: PortalData) => PortalData) => setData((d) => fn(d)),
    [],
  );

  const value = useMemo<PortalContextValue>(() => {
    return {
      ...data,
      addChapter: (name, continent) =>
        update((d) => ({
          ...d,
          chapters: [...d.chapters, { id: uid("ch"), name, continent, status: "approved" }],
        })),
      setChapterStatus: (id, status) =>
        update((d) => ({
          ...d,
          chapters: d.chapters.map((c) => (c.id === id ? { ...c, status } : c)),
        })),
      addCenter: (input) =>
        update((d) => ({
          ...d,
          centers: [...d.centers, { id: uid("c"), status: "approved", ...input }],
        })),
      setCenterStatus: (id, status) =>
        update((d) => ({
          ...d,
          centers: d.centers.map((c) => (c.id === id ? { ...c, status } : c)),
        })),
      addTrainer: (input) =>
        update((d) => ({
          ...d,
          trainers: [...d.trainers, { id: uid("tr"), status: "pending", ...input }],
        })),
      setTrainerStatus: (id, status) =>
        update((d) => ({
          ...d,
          trainers: d.trainers.map((t) => (t.id === id ? { ...t, status } : t)),
        })),
      addStudent: (input) => {
        const student: Student = {
          id: uid("s"),
          studentNumber: makeStudentNumber(Math.floor(Math.random() * 899999) + 100000),
          name: input.name,
          email: input.email,
          centerId: input.centerId,
          selfPaced: input.centerId === null,
          level: input.level,
          progress: 0,
        };
        update((d) => ({ ...d, students: [...d.students, student] }));
        return student;
      },
      setStudentProgress: (id, progress) =>
        update((d) => ({
          ...d,
          students: d.students.map((s) => (s.id === id ? { ...s, progress } : s)),
        })),
      bookExam: (input) =>
        update((d) => ({
          ...d,
          bookings: [...d.bookings, { id: uid("bk"), status: "pending", ...input }],
        })),
      setBookingStatus: (id, status) =>
        update((d) => ({
          ...d,
          bookings: d.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
        })),
      issueCertificate: (studentId, level) => {
        let created: Certificate | null = null;
        update((d) => {
          const existing = d.certificates.find((c) => c.studentId === studentId);
          if (existing) {
            created = existing;
            return d;
          }
          const student = d.students.find((s) => s.id === studentId);
          const issued = today();
          const cert: Certificate = {
            id: uid("cert"),
            studentId,
            studentName: student?.name ?? "Student",
            studentNumber: student?.studentNumber ?? "—",
            level,
            token: makeToken(level),
            issuedAt: issued,
            expiresAt: plusYears(issued, 3),
            status: "valid",
          };
          created = cert;
          return { ...d, certificates: [...d.certificates, cert] };
        });
        return created;
      },
      revokeCertificate: (id) =>
        update((d) => ({
          ...d,
          certificates: d.certificates.map((c) =>
            c.id === id ? { ...c, status: "revoked" } : c,
          ),
        })),
      certByToken: (token) =>
        data.certificates.find(
          (c) => c.token.toUpperCase() === token.trim().toUpperCase(),
        ),
      certByStudentId: (studentId) =>
        data.certificates.find((c) => c.studentId === studentId),
      addMaterial: (input) =>
        update((d) => ({ ...d, materials: [...d.materials, { id: uid("m"), ...input }] })),
      addAnnouncement: (input) =>
        update((d) => ({
          ...d,
          announcements: [{ id: uid("a"), date: today(), ...input }, ...d.announcements],
        })),
      addAssignment: (input) =>
        update((d) => ({ ...d, assignments: [...d.assignments, { id: uid("as"), ...input }] })),
      sendEmail: (input) =>
        update((d) => ({
          ...d,
          emails: [{ id: uid("em"), date: today(), ...input }, ...d.emails],
        })),
      reset: () => setData(SEED),
    };
  }, [data, update]);

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal(): PortalContextValue {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used within PortalProvider");
  return ctx;
}

/** Maps a demo session user to the portal entity they operate as. */
export function scopeForUser(role: Role): {
  chapterId?: string;
  centerId?: string;
  trainerId?: string;
  studentId?: string;
} {
  switch (role) {
    case "chapter":
      return { chapterId: "ch-1" };
    case "center":
      return { centerId: "c-1" };
    case "trainer":
      return { trainerId: "tr-1", centerId: "c-1" };
    case "student":
      return { studentId: "s-1" };
    default:
      return {};
  }
}
