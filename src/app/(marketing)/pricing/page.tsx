"use client";

import { useMemo, useState } from "react";
import {
  REGIONS,
  BUNDLE_TIERS,
  OTHER_PRODUCTS,
  PRICE_REVISION_STATEMENT,
  pricePerToken,
  bundleDiscount,
  totalFor,
  type Region,
} from "@/lib/pricing";

// Geographic world map (equirectangular projection: viewBox 1000x500 mapped from
// lon -180..180, lat 85..-85). Continent paths are drawn from real coastline
// points so each region is visually recognisable.
interface MapShape {
  key: string;
  path: string;
  labelX: number;
  labelY: number;
  priceX: number;
  priceY: number;
  labelFont?: number;
  priceFont?: number;
}

const MAP_SHAPES: MapShape[] = [
  {
    key: "north-america",
    path:
      "M 33 69 L 56 94 L 83 83 L 111 83 L 125 92 L 139 100 L 156 117 L 156 133 L 161 147 L 175 158 L 181 161 L 200 164 L 231 178 L 242 167 L 253 167 L 269 167 L 278 178 L 278 161 L 289 147 L 294 139 L 311 128 L 333 119 L 344 103 L 333 94 L 300 50 L 269 44 L 222 42 L 181 47 L 144 56 L 108 56 L 69 53 L 56 56 L 39 61 Z",
    labelX: 200, labelY: 108, priceX: 200, priceY: 132,
  },
  {
    key: "latam",
    path:
      "M 175 161 L 200 164 L 231 178 L 225 192 L 236 200 L 242 206 L 258 206 L 264 219 L 278 225 L 300 217 L 314 219 L 331 228 L 347 233 L 356 236 L 361 250 L 378 256 L 394 264 L 403 272 L 394 286 L 389 311 L 372 317 L 367 328 L 339 344 L 322 356 L 319 375 L 311 389 L 308 403 L 294 394 L 294 375 L 300 347 L 303 342 L 303 300 L 294 281 L 281 272 L 275 264 L 278 256 L 275 250 L 286 231 L 272 228 L 267 222 L 250 214 L 244 211 L 236 206 L 222 203 L 208 194 L 194 183 L 183 186 L 194 186 L 194 167 Z",
    labelX: 345, labelY: 300, priceX: 345, priceY: 322,
  },
  {
    key: "eu",
    path:
      "M 475 147 L 475 130 L 497 119 L 486 117 L 500 114 L 508 108 L 514 103 L 522 94 L 528 83 L 514 78 L 528 69 L 567 53 L 592 58 L 625 64 L 667 61 L 667 97 L 639 97 L 639 125 L 633 139 L 611 136 L 583 125 L 578 133 L 556 139 L 550 139 L 542 144 L 522 128 L 500 130 L 492 150 Z",
    labelX: 560, labelY: 92, priceX: 560, priceY: 112,
    labelFont: 11, priceFont: 14,
  },
  {
    key: "africa",
    path:
      "M 483 150 L 472 153 L 453 192 L 453 211 L 464 228 L 475 233 L 492 236 L 503 233 L 522 239 L 531 244 L 525 253 L 533 264 L 536 283 L 539 311 L 550 344 L 578 344 L 589 331 L 611 319 L 611 292 L 611 256 L 619 236 L 642 219 L 619 214 L 606 200 L 592 172 L 586 164 L 578 164 L 556 161 L 528 158 L 500 150 Z",
    labelX: 540, labelY: 270, priceX: 540, priceY: 294,
  },
  {
    key: "gcc",
    path:
      "M 594 169 L 600 161 L 606 153 L 617 147 L 628 153 L 633 164 L 642 169 L 645 175 L 658 181 L 667 189 L 650 203 L 633 211 L 619 214 L 611 192 L 606 172 Z",
    labelX: 632, labelY: 182, priceX: 632, priceY: 198,
    labelFont: 9, priceFont: 12,
  },
  {
    key: "asia",
    path:
      "M 635 119 L 653 83 L 694 56 L 722 42 L 778 36 L 847 42 L 917 50 L 972 56 L 1000 69 L 972 83 L 931 97 L 903 125 L 875 153 L 839 164 L 806 189 L 797 219 L 786 211 L 775 233 L 772 203 L 750 189 L 728 228 L 703 203 L 681 181 L 667 175 L 650 172 L 642 167 L 628 156 L 625 142 Z",
    labelX: 820, labelY: 110, priceX: 820, priceY: 138,
  },
  {
    key: "oceania",
    path:
      "M 861 283 L 875 283 L 889 281 L 897 286 L 897 297 L 917 314 L 925 328 L 919 344 L 914 356 L 892 356 L 875 344 L 842 344 L 819 339 L 817 311 L 839 300 L 850 289 Z",
    labelX: 870, labelY: 320, priceX: 870, priceY: 342,
    labelFont: 11, priceFont: 14,
  },
];

// Additional island/secondary shapes for visual realism (not interactive).
const STATIC_LANDMASSES: string[] = [
  // United Kingdom + Ireland
  "M 485 95 L 492 89 L 500 95 L 497 108 L 487 115 L 480 105 Z",
  "M 469 108 L 478 105 L 481 117 L 472 119 Z",
  // Iceland
  "M 458 67 L 472 64 L 478 75 L 461 78 Z",
  // Greenland
  "M 350 30 L 405 25 L 425 55 L 410 100 L 380 105 L 360 80 Z",
  // Madagascar
  "M 625 295 L 633 290 L 642 320 L 633 335 L 628 320 Z",
  // Japan
  "M 889 130 L 906 125 L 911 140 L 900 150 L 892 142 Z",
  // Philippines
  "M 836 200 L 844 200 L 847 215 L 839 220 L 833 211 Z",
  // Indonesia (Sumatra+Java grouped)
  "M 758 233 L 800 244 L 803 258 L 781 258 L 758 247 Z",
  // Borneo
  "M 803 233 L 822 233 L 822 250 L 808 250 Z",
  // New Zealand
  "M 953 358 L 961 353 L 967 375 L 958 383 Z",
  "M 945 380 L 953 378 L 958 392 L 950 397 Z",
  // Sri Lanka
  "M 728 225 L 736 225 L 736 236 L 728 236 Z",
];

function fmt(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export default function PricingPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(10);

  const tableRows = useMemo(() => {
    const rows: { country: string; region: string; price: number }[] = [];
    for (const r of REGIONS) {
      const unit = pricePerToken(r);
      for (const c of r.countries) {
        rows.push({ country: c.name, region: r.name, price: unit });
      }
    }
    return rows.sort((a, b) => a.country.localeCompare(b.country));
  }, []);

  const activeRegion: Region | undefined = useMemo(
    () => (hovered ? REGIONS.find((r) => r.key === hovered) : undefined),
    [hovered],
  );

  const discount = bundleDiscount(qty);

  return (
    <div className="container-x py-14">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Pricing booklet</span>
        <h1 className="gradient-text-animated mt-5 text-balance text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl">
          IQCDL pricing — calibrated by region, fair by design
        </h1>
        <p className="mt-4 text-balance text-base leading-relaxed text-muted/90 sm:text-lg">
          Prices reflect more than cost: purchasing power, market perception, certification value and IAIDL brand positioning.
        </p>
      </div>

      {/* Rights statement */}
      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-quantum-cyan/20 bg-quantum-cyan/5 p-5 text-sm leading-relaxed text-fg">
        {PRICE_REVISION_STATEMENT}
      </div>

      {/* Map */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-fg">Regions at a glance</h2>
        <p className="mt-2 text-sm text-muted">
          Hover or tap a region to see its per-token price.
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl border border-line/10 bg-gradient-to-br from-[#0b1424] via-[#070b14] to-[#0a192b]">
            <svg
              viewBox="0 0 1000 500"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Regional pricing world map"
            >
              <defs>
                <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d1a2e" />
                  <stop offset="100%" stopColor="#0a1422" />
                </linearGradient>
                <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(56,189,248,0.16)" />
                  <stop offset="100%" stopColor="rgba(56,189,248,0.06)" />
                </linearGradient>
                <linearGradient id="land-active" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(56,189,248,0.55)" />
                  <stop offset="100%" stopColor="rgba(56,189,248,0.25)" />
                </linearGradient>
              </defs>

              {/* ocean */}
              <rect x="0" y="0" width="1000" height="500" fill="url(#ocean)" />

              {/* lat/lon graticule */}
              <g stroke="rgba(56,189,248,0.07)" strokeWidth="0.6" fill="none">
                {Array.from({ length: 11 }, (_, i) => i * 100).map((x) => (
                  <line key={`v${x}`} x1={x} y1={0} x2={x} y2={500} />
                ))}
                {Array.from({ length: 6 }, (_, i) => i * 100).map((y) => (
                  <line key={`h${y}`} x1={0} y1={y} x2={1000} y2={y} />
                ))}
                {/* equator slightly stronger */}
                <line x1={0} y1={250} x2={1000} y2={250} stroke="rgba(56,189,248,0.14)" strokeDasharray="4 6" />
              </g>

              {/* non-interactive islands & landmasses (Greenland, UK, Japan, etc.) */}
              <g
                fill="rgba(56,189,248,0.08)"
                stroke="rgba(56,189,248,0.35)"
                strokeWidth="0.8"
                style={{ pointerEvents: "none" }}
              >
                {STATIC_LANDMASSES.map((d, i) => (
                  <path key={`static-${i}`} d={d} />
                ))}
              </g>

              {/* interactive regions */}
              {MAP_SHAPES.map((shape) => {
                const region = REGIONS.find((r) => r.key === shape.key);
                if (!region) return null;
                const isActive = hovered === shape.key;
                const labelFont = shape.labelFont ?? 13;
                const priceFont = shape.priceFont ?? 17;
                return (
                  <g
                    key={shape.key}
                    role="button"
                    tabIndex={0}
                    aria-label={`${region.name} — ${fmt(pricePerToken(region))} per token`}
                    onMouseEnter={() => setHovered(shape.key)}
                    onMouseLeave={() =>
                      setHovered((cur) => (cur === shape.key ? null : cur))
                    }
                    onFocus={() => setHovered(shape.key)}
                    onBlur={() =>
                      setHovered((cur) => (cur === shape.key ? null : cur))
                    }
                    onClick={() => setHovered(shape.key)}
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      d={shape.path}
                      fill={isActive ? "url(#land-active)" : "url(#land)"}
                      stroke="#38bdf8"
                      strokeOpacity={isActive ? 0.95 : 0.6}
                      strokeWidth={isActive ? 2 : 1}
                      strokeLinejoin="round"
                      style={{
                        filter: isActive
                          ? "drop-shadow(0 0 14px rgba(56,189,248,0.55))"
                          : "none",
                        transition: "all 200ms ease",
                      }}
                    />
                    <text
                      x={shape.labelX}
                      y={shape.labelY}
                      textAnchor="middle"
                      fontFamily="Arial, Helvetica, sans-serif"
                      fontSize={labelFont}
                      fontWeight="700"
                      letterSpacing="1.2"
                      fill="#e2e8f0"
                      style={{ textTransform: "uppercase", pointerEvents: "none" }}
                    >
                      {region.name}
                    </text>
                    <text
                      x={shape.priceX}
                      y={shape.priceY}
                      textAnchor="middle"
                      fontFamily="Arial, Helvetica, sans-serif"
                      fontSize={priceFont}
                      fontWeight="700"
                      fill="#38bdf8"
                      style={{ pointerEvents: "none" }}
                    >
                      {fmt(pricePerToken(region))}
                      <tspan
                        fontSize={Math.max(9, Math.round(priceFont * 0.58))}
                        fontWeight="400"
                        fill="#94a3b8"
                        dx="4"
                      >
                        / token
                      </tspan>
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Region detail + live estimator (merged) */}
          <div className="flex flex-col gap-5 rounded-3xl border border-line/10 bg-surface/5 p-6">
            {activeRegion ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {activeRegion.name}
                </p>
                <p className="mt-2 text-3xl font-bold text-fg">
                  {fmt(pricePerToken(activeRegion))}
                  <span className="ms-2 text-sm font-normal text-muted">/ token</span>
                </p>
                {activeRegion.capPerToken && (
                  <p className="mt-1 text-xs text-quantum-cyan">
                    Capped at {fmt(activeRegion.capPerToken)}
                  </p>
                )}
                {activeRegion.floorPerToken && (
                  <p className="mt-1 text-xs text-quantum-cyan">
                    Floor of {fmt(activeRegion.floorPerToken)}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {activeRegion.rationale}
                </p>
                <p className="mt-3 text-xs text-faint">
                  {activeRegion.countries.length} listed countries
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Select a region
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Hover, tap or pick a region below to see its per-token price,
                  rationale and country coverage — and run a live estimate.
                </p>
              </div>
            )}

            {/* Live estimator (was Quick Estimator) */}
            <div className="border-t border-line/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Quick estimator
              </p>
              <label className="mt-3 block text-sm text-muted">
                Region
                <select
                  value={hovered ?? ""}
                  onChange={(e) => setHovered(e.target.value || null)}
                  className="mt-1 w-full rounded-xl border border-quantum-cyan/30 bg-surface/10 px-3 py-2 text-sm font-semibold text-quantum-cyan focus:outline-none focus:ring-2 focus:ring-quantum-cyan/40 [&>option]:bg-[#0f1726] [&>option]:text-quantum-cyan"
                >
                  <option value="">Choose a region…</option>
                  {REGIONS.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-4 block text-sm text-muted">
                Tokens
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="mt-1 w-full rounded-xl border border-line/10 bg-surface/10 px-3 py-2 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-quantum-cyan/40"
                />
              </label>
              <div className="mt-5 rounded-2xl border border-quantum-cyan/30 bg-quantum-cyan/10 p-4">
                <p className="text-xs uppercase tracking-wider text-muted">Estimated total</p>
                <p className="mt-1 text-3xl font-bold text-fg">
                  {activeRegion ? fmt(totalFor(activeRegion, qty)) : "—"}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {activeRegion
                    ? `${fmt(pricePerToken(activeRegion))} × ${qty}${
                        discount > 0 ? ` − ${Math.round(discount * 100)}% bundle` : ""
                      }`
                    : "Pick a region to estimate."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country table */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-fg">Per-country token price</h2>
        <p className="mt-2 text-sm text-muted">
          {tableRows.length} countries listed. All prices in USD per training
          token (one course, one candidate), before bundle discounts.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line/10">
          <table className="min-w-full divide-y divide-line/10 text-sm">
            <thead className="bg-surface/10 text-left text-xs font-semibold uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3 text-end">Per-token price (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/10">
              {tableRows.map((row) => (
                <tr key={row.country} className="hover:bg-surface/5">
                  <td className="px-4 py-2.5 text-fg">{row.country}</td>
                  <td className="px-4 py-2.5 text-muted">{row.region}</td>
                  <td className="px-4 py-2.5 text-end font-semibold text-fg">
                    {fmt(row.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bundle tiers (full width — estimator moved into the map's side panel) */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-fg">Bundle discounts</h2>
        <p className="mt-2 text-sm text-muted">
          Volume tokens are discounted automatically — applied on top of the
          regional unit price.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {BUNDLE_TIERS.map((t) => (
            <li
              key={t.label}
              className="rounded-2xl border border-line/10 bg-surface/5 p-4"
            >
              <p className="text-sm font-semibold text-fg">{t.label}</p>
              <p className="mt-1 text-2xl font-bold text-quantum-cyan">
                {t.discount === 0 ? "—" : `-${Math.round(t.discount * 100)}%`}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Other products */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-fg">Other product lines</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {OTHER_PRODUCTS.map((p) => (
            <div
              key={p.key}
              className="rounded-2xl border border-line/10 bg-surface/5 p-5"
            >
              <p className="text-base font-semibold text-fg">{p.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {p.description}
              </p>
              <p className="mt-3 text-lg font-bold text-quantum-cyan">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-12 text-center text-xs text-faint">
        Prices in US dollars · all amounts excluding any local taxes or duties.
      </p>
    </div>
  );
}
