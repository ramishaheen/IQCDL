"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CONTINENTS,
  makeStudentNumber,
  makeToken,
  plusYears,
  scopeForUser,
  SEED,
  STORAGE_KEY,
  today,
  uid,
  type ApprovalStatus,
  type Certificate,
  type ExamStatus,
  type Level,
  type PortalData,
  type Student,
} from "@/lib/portal-data";

// Re-export shared API so existing `@/lib/portal` imports keep working.
export { CONTINENTS, makeStudentNumber, makeToken, scopeForUser };
export type {
  ApprovalStatus,
  Announcement,
  Assignment,
  Center,
  Certificate,
  Chapter,
  EmailLog,
  ExamBooking,
  ExamStatus,
  Level,
  Material,
  PortalData,
  Student,
  Trainer,
} from "@/lib/portal-data";

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
  const serverBacked = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load: prefer the server (shared, cross-device) and fall back to
  // localStorage so the demo still works offline / when not signed in.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/portal", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (!cancelled && json?.data) {
            serverBacked.current = true;
            setData(json.data as PortalData);
            setHydrated(true);
            return;
          }
        }
      } catch {
        /* fall through to localStorage */
      }
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!cancelled && raw) setData(JSON.parse(raw) as PortalData);
      } catch {
        /* ignore */
      }
      if (!cancelled) setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist: always cache to localStorage; when server-backed, debounce a PUT.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
    if (serverBacked.current) {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        fetch("/api/portal", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        }).catch(() => {});
      }, 600);
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
