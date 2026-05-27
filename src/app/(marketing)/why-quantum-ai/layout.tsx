import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Why Quantum AI",
  description:
    "The defining opportunity — and threat — of the next decade: where quantum supercharges AI, why today's encryption will break, and how to get certified before the threats arrive.",
  path: "/why-quantum-ai",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
