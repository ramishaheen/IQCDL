import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "International Quantum Computing Index — Country by Country",
  description:
    "The IQCDL Quantum Index — country-by-country quantum readiness rankings. Methodology, category scoring, regional breakdowns. AI-generated, vendor-neutral, refreshed quarterly.",
  path: "/quantum-index",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
