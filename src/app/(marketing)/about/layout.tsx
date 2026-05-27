import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About IQCDL",
  description:
    "Established 2025 in the United States and inherited from IAIDL (since 2014, present in 94+ countries). Our mission, governance, leadership and board of directors.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
