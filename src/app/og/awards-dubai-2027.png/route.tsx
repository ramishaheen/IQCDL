import { renderOg } from "@/lib/og";

export const runtime = "edge";

export async function GET() {
  return renderOg({
    eyebrow: "GQA 2027 — Grand Ceremony · Dubai",
    title: "Global Quantum & AI Award",
    subtitle:
      "Phase 5 of the IQCDL 2027 Global Cycle · Nov 2027 · proceeds fund the UN SDGs",
    accent: "#fbbf24",
  });
}
