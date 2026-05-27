import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "IQCDL Membership";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Membership",
    title: "Join the quantum-ready community",
    subtitle: "$19/year · AI quantum-expert agents · free online course · 10% course discount",
    accent: "#34d399",
  });
}
