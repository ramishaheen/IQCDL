import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "IQCDL Pricing — Per-Region Token Pricing",
  description:
    "IQCDL pricing is purchasing-power calibrated by region. Centre royalty: $1,500/year, minimum 3-year commitment. Contact admin@iqcdl.org for current local pricing.",
  path: "/pricing",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
