import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Global Quantum Award (GQA)",
  description:
    "A biennial, AI-assessed award for SMEs and government entities, scored against a published rubric. Enter international categories from $1,000 — all proceeds advance the UN SDGs.",
  path: "/awards",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
