import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Why Quantum AI — IQCDL";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Why Quantum AI",
    title: "The opportunity — and threat — of the decade",
    subtitle: "Today's encryption will break. Get certified before the threats arrive.",
    accent: "#22d3ee",
  });
}
