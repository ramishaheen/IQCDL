"use client";

// Official IQCDL embossed seal — atom glyph with circular legend.
// `tone` switches between the light-portal and dark-sample certificates.
export function CertificateSeal({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const ring = tone === "dark" ? "#7dd3fc" : "#1d4ed8";
  const text = tone === "dark" ? "#bae6fd" : "#1e3a8a";
  const atom = tone === "dark" ? "#a5f3fc" : "#2563eb";

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="IQCDL official seal">
      <defs>
        <path id="seal-top" d="M 30 100 A 70 70 0 0 1 170 100" fill="none" />
        <path id="seal-bottom" d="M 168 100 A 68 68 0 0 1 32 100" fill="none" />
      </defs>

      {/* rings */}
      <circle cx="100" cy="100" r="92" fill="none" stroke={ring} strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="100" r="84" fill="none" stroke={ring} strokeWidth="2" />
      <circle cx="100" cy="100" r="60" fill="none" stroke={ring} strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />

      {/* circular legend */}
      <text fill={text} fontSize="11" fontWeight="700" letterSpacing="2">
        <textPath href="#seal-top" startOffset="50%" textAnchor="middle">
          INTERNATIONAL · QUANTUM · COMPUTING
        </textPath>
      </text>
      <text fill={text} fontSize="11" fontWeight="700" letterSpacing="3">
        <textPath href="#seal-bottom" startOffset="50%" textAnchor="middle">
          DRIVING · LICENSE
        </textPath>
      </text>

      {/* atom glyph */}
      <g transform="translate(100 88)" stroke={atom} strokeWidth="2.5" fill="none">
        <ellipse rx="22" ry="9" />
        <ellipse rx="22" ry="9" transform="rotate(60)" />
        <ellipse rx="22" ry="9" transform="rotate(120)" />
        <circle r="4" fill={atom} stroke="none" />
      </g>
      <text x="100" y="128" textAnchor="middle" fill={text} fontSize="16" fontWeight="800" letterSpacing="2">
        IQCDL
      </text>
    </svg>
  );
}
