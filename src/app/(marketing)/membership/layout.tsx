import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Membership",
  description:
    "Join IQCDL for $19/year: the member community, AI quantum-expert agents, the Quantum Guide chat, a free online course and a 10% course discount.",
  path: "/membership",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
