import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "IQCDL Programs — Foundation, Practitioner & Free Intro",
  description:
    "Three quantum certification levels: Quantum Computing for Everyone (free), IQCDL Foundation (leaders), IQCDL Practitioner (engineers). NIST PQC-aligned.",
  path: "/programs",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
