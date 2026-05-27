import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Members' Community",
  description:
    "Exchange knowledge with AI quantum experts and fellow members. Read the latest publications and ask anything about quantum and AI-enabled quantum.",
  path: "/community",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
