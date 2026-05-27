import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "IQCDL Programs & Certification";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Programs & Certification",
    title: "From quantum-curious to quantum-ready",
    subtitle: "Quantum for Everyone (free) · Foundation · Practitioner — verifiable, stamped credential",
    accent: "#818cf8",
  });
}
