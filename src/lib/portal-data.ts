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
  centerId: string | null;
  selfPaced: boolean;
  level: Level;
  progress: number;
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

export interface PortalData {
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

export const STORAGE_KEY = "iqcdl_portal_v1";

// Deterministic seed (fixed ids/dates) so SSR and first client render match.
export const SEED: PortalData = {
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

export function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
export function plusYears(iso: string, years: number): string {
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
