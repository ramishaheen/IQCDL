import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Global Quantum Award (GQA)";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Global Quantum Award",
    title: "Recognizing the builders of the quantum era",
    subtitle: "AI-assessed · biennial · for SMEs & governments · proceeds fund the UN SDGs",
    accent: "#fbbf24",
  });
}
