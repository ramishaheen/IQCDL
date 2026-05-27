import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Branded 1200×630 social card. Distinct accent + copy per page boosts
// click-through and shareability (reach / virality).
export function renderOg({
  eyebrow,
  title,
  subtitle,
  accent = "#7dd3fc",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  accent?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #05060f 0%, #0e2a4f 60%, #0b1030 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: `4px solid ${accent}`,
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 18, background: accent }} />
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: 2 }}>IQCDL</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 3, color: accent, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 62, fontWeight: 800, lineHeight: 1.08, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 30, color: "#cbd5e1", maxWidth: 1000 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#94a3b8" }}>iqcdl.org</div>
          <div style={{ display: "flex", fontSize: 22, color: "#94a3b8" }}>
            The international standard for quantum-readiness
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
