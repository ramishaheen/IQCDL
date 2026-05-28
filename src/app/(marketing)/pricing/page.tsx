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

// Stylized regional tiles — approximate world layout for hover-by-region pricing.
// Stylised but recognizable continent paths (rough but map-ish) over a
// 1000×500 viewBox. Each region has a path, a label position and a price
// position for the on-region price tag.
interface MapShape {
  key: string;
  path: string; // SVG path data
  labelX: number;
  labelY: number;
  priceX: number;
  priceY: number;
}

const MAP_SHAPES: MapShape[] = [
  {
    key: "north-america",
    path: "M 65 85 L 215 70 L 290 105 L 295 165 L 270 215 L 230 240 L 175 235 L 95 215 L 55 165 L 50 125 Z",
    labelX: 175, labelY: 145, priceX: 175, priceY: 175,
  },
  {
    key: "latam",
    path: "M 200 250 L 280 260 L 295 305 L 280 360 L 250 420 L 215 455 L 195 430 L 185 360 L 190 295 Z",
    labelX: 240, labelY: 340, priceX: 240, priceY: 370,
  },
  {
    key: "eu",
    path: "M 460 85 L 575 78 L 595 130 L 575 180 L 500 180 L 465 150 L 450 110 Z",
    labelX: 522, labelY: 125, priceX: 522, priceY: 150,
  },
  {
    key: "africa",
    path: "M 495 230 L 605 225 L 625 285 L 615 345 L 580 395 L 530 405 L 485 360 L 475 295 L 480 255 Z",
    labelX: 550, labelY: 305, priceX: 550, priceY: 335,
  },
  {
    key: "gcc",
    path: "M 615 200 L 675 195 L 685 235 L 660 270 L 620 260 L 608 225 Z",
    labelX: 645, labelY: 225, priceX: 645, priceY: 248,
  },
  {
    key: "asia",
    path: "M 600 70 L 890 75 L 920 145 L 905 215 L 850 270 L 770 285 L 700 280 L 685 240 L 685 200 L 615 190 L 590 130 Z",
    labelX: 770, labelY: 155, priceX: 770, priceY: 195,
  },
  {
    key: "oceania",
    path: "M 800 365 L 925 370 L 935 415 L 895 445 L 815 445 L 790 415 Z",
    labelX: 860, labelY: 400, priceX: 860, priceY: 425,
  },
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
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl border border-line/10 bg-gradient-to-br from-quantum-indigo/15 via-[#070b14] to-quantum-cyan/10">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background:linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
            <svg
              viewBox="0 0 1000 500"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Regional pricing map"
            >
              {MAP_SHAPES.map((shape) => {
                const region = REGIONS.find((r) => r.key === shape.key);
                if (!region) return null;
                const isActive = hovered === shape.key;
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
                      fill={
                        isActive
                          ? "rgba(56,189,248,0.32)"
                          : "rgba(56,189,248,0.10)"
                      }
                      stroke="#38bdf8"
                      strokeOpacity={isActive ? 0.95 : 0.55}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      style={{
                        filter: isActive
                          ? "drop-shadow(0 0 18px rgba(56,189,248,0.6))"
                          : "none",
                        transition: "all 200ms ease",
                      }}
                    />
                    <text
                      x={shape.labelX}
                      y={shape.labelY}
                      textAnchor="middle"
                      fontFamily="Arial, Helvetica, sans-serif"
                      fontSize="14"
                      fontWeight="700"
                      letterSpacing="1.5"
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
                      fontSize="18"
                      fontWeight="700"
                      fill="#38bdf8"
                      style={{ pointerEvents: "none" }}
                    >
                      {fmt(pricePerToken(region))}
                      <tspan
                        fontSize="10"
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
