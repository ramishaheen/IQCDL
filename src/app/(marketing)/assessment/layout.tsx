import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Free Quantum Readiness Assessment — AI-Guided in 2 Minutes",
  description:
    "Get a tailored quantum-readiness score, risk profile and AI-generated migration plan in about 2 minutes. Free. The IQCDL Quantum Guide. In any of six languages.",
  path: "/assessment",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
