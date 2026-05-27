import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Standards & Accreditation",
  description:
    "IQCDL aligns with NIST FIPS 203/204/205, ISO/IEC, IEEE and the EU PQC roadmap — a quantum-readiness credential employers and regulators can trust.",
  path: "/standards",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
