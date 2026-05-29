import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Global Quantum Award — Categories, Criteria, AI Jury Scoring",
  description:
    "The IQCDL Global Quantum Award — categories, rubric, and how a neutral AI jury scores entries. Biennial cycle, SDG-funded, Dubai 2027 Grand Ceremony.",
  path: "/awards",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
