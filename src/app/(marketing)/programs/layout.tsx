import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Programs & Certification",
  description:
    "Three quantum-readiness tracks — Quantum for Everyone (free, zero-code), Foundation and Practitioner — with full outlines, exams and a verifiable, stamped IQCDL certificate.",
  path: "/programs",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
