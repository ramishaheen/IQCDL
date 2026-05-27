import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "IQCDL — International Quantum Computing Driving License";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "IQCDL",
    title: "International Quantum Computing Driving License",
    subtitle: "AI-powered readiness assessment, immersive training and a verifiable credential.",
  });
}
