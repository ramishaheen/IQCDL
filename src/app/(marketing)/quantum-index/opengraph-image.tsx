import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "International Quantum Computing Index (IQCI)";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "International Quantum Computing Index",
    title: "The world's quantum power, measured",
    subtitle: "AI-generated · vendor-neutral · 70+ countries · 8 categories · refreshed quarterly",
    accent: "#38bdf8",
  });
}
