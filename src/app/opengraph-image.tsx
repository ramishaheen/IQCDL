import { ImageResponse } from "next/og";

export const alt = "IQCDL — International Quantum Computing Driving License";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #05060f 0%, #0e2a4f 60%, #0b1030 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 18,
              border: "4px solid #7dd3fc",
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: 22, background: "#7dd3fc" }} />
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: 2 }}>IQCDL</div>
        </div>
        <div style={{ marginTop: 36, fontSize: 56, fontWeight: 800, lineHeight: 1.1, color: "#7dd3fc", maxWidth: 900 }}>
          International Quantum Computing Driving License
        </div>
        <div style={{ marginTop: 24, fontSize: 30, color: "#cbd5e1", maxWidth: 920 }}>
          The international standard for quantum-readiness — AI-powered assessment, immersive training and a verifiable credential.
        </div>
        <div style={{ marginTop: 40, fontSize: 24, color: "#94a3b8" }}>iqcdl.org</div>
      </div>
    ),
    size,
  );
}
