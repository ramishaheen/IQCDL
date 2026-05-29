import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About IQCDL — Member of the IAIDL Group",
  description:
    "IQCDL is the quantum-computing sister credential of IAIDL. Member of the IAIDL Group. Recognised in 50+ countries. 6 languages. NIST + ISO/IEC + IEEE + EU PQC aligned.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
