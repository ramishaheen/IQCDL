/** Animated IQCDL atom mark (SMIL-only, no JS). */
export function AtomIcon({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  const cx = 50;
  const cy = 50;
  const rx = 38;
  const ry = 13;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {/* orbit 1 */}
      <g>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx={cx + rx} cy={cy} r="3.6" fill="currentColor" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur="14s"
          repeatCount="indefinite"
        />
      </g>
      {/* orbit 2 */}
      <g>
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          transform={`rotate(60 ${cx} ${cy})`}
        />
        <circle cx={cx + rx} cy={cy} r="3.6" fill="currentColor" transform={`rotate(60 ${cx} ${cy})`} />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`60 ${cx} ${cy}`}
          to={`-300 ${cx} ${cy}`}
          dur="20s"
          repeatCount="indefinite"
        />
      </g>
      {/* orbit 3 */}
      <g>
        <ellipse
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          transform={`rotate(120 ${cx} ${cy})`}
        />
        <circle cx={cx + rx} cy={cy} r="3.6" fill="currentColor" transform={`rotate(120 ${cx} ${cy})`} />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`120 ${cx} ${cy}`}
          to={`480 ${cx} ${cy}`}
          dur="17s"
          repeatCount="indefinite"
        />
      </g>
      {/* nucleus */}
      <circle cx={cx} cy={cy} r="5" fill="currentColor">
        <animate attributeName="r" values="5;6.5;5" dur="3.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
