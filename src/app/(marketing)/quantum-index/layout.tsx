import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "International Quantum Computing Index (IQCI)",
  description:
    "An AI-generated, vendor-neutral index scoring every country's quantum readiness across eight categories — research, talent, investment, infrastructure, policy, PQC security, environment and ethics — refreshed every quarter.",
  path: "/quantum-index",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
