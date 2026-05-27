import Link from "next/link";
import { cn } from "@/lib/cn";

/** Animated atom glyph (orbits use SMIL so it works without client JS). */
function AtomGlyph({
  cx,
  cy,
  rx,
  ry,
  frame,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  frame: { x: number; y: number; w: number; h: number; r: number; sw: number };
}) {
  const orbit = (rot: number, dur: number, dir: 1 | -1, sw: number) => (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="currentColor" strokeWidth={sw} />
      <circle cx={cx + rx} cy={cy} r={ry * 0.42 + 1.4} fill="currentColor" />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from={`${rot} ${cx} ${cy}`}
        to={`${rot + dir * 360} ${cx} ${cy}`}
        dur={`${dur}s`}
        repeatCount="indefinite"
      />
    </g>
  );
  return (
    <g>
      <rect
        x={frame.x}
        y={frame.y}
        width={frame.w}
        height={frame.h}
        rx={frame.r}
        fill="none"
        stroke="currentColor"
        strokeWidth={frame.sw}
      />
      {orbit(0, 14, 1, frame.sw * 0.62)}
      {orbit(60, 20, -1, frame.sw * 0.62)}
      {orbit(120, 17, 1, frame.sw * 0.62)}
      <circle cx={cx} cy={cy} r={ry * 0.6 + 1.5} fill="currentColor">
        <animate
          attributeName="r"
          values={`${ry * 0.6 + 1.5};${ry * 0.6 + 3};${ry * 0.6 + 1.5}`}
          dur="3.2s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

export function Logo({
  className,
  variant = "mark",
}: {
  className?: string;
  variant?: "mark" | "full";
}) {
  const wordmarkFont =
    "'Arial Black','Helvetica Neue',Arial,sans-serif";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center text-brand-600",
        className,
      )}
      aria-label="IQCDL — International Quantum Computing Driving License home"
    >
      {variant === "full" ? (
        <svg
          viewBox="0 0 850 180"
          className="h-12 w-auto"
          role="img"
          aria-label="IQCDL — International Quantum Computing Driving License"
        >
          <rect x="8" y="24" width="398" height="132" rx="26" fill="none" stroke="currentColor" strokeWidth="5" />
          <AtomGlyph cx={82} cy={90} rx={29} ry={10.5} frame={{ x: 44, y: 52, w: 76, h: 76, r: 16, sw: 4.5 }} />
          <text x="152" y="120" fontFamily={wordmarkFont} fontSize="80" fontWeight="900" letterSpacing="3" fill="currentColor">
            IQCDL
          </text>
          <g fontFamily="Arial,'Helvetica Neue',sans-serif" fontWeight="700" letterSpacing="2" fill="currentColor">
            <text x="426" y="71" fontSize="26">INTERNATIONAL</text>
            <text x="426" y="105" fontSize="26">QUANTUM COMPUTING</text>
            <text x="426" y="139" fontSize="26">DRIVING LICENSE</text>
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 430 120"
          className="h-9 w-auto"
          role="img"
          aria-label="IQCDL"
        >
          <rect x="6" y="14" width="418" height="92" rx="22" fill="none" stroke="currentColor" strokeWidth="4.5" />
          <AtomGlyph cx={62} cy={60} rx={21} ry={7.5} frame={{ x: 34, y: 32, w: 56, h: 56, r: 13, sw: 4 }} />
          <text x="112" y="82" fontFamily={wordmarkFont} fontSize="60" fontWeight="900" letterSpacing="2.5" fill="currentColor">
            IQCDL
          </text>
        </svg>
      )}
    </Link>
  );
}
