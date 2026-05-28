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
const MAP_TILES: { key: string; left: string; top: string; width: string; height: string }[] = [
  { key: "north-america", left: "4%",  top: "12%", width: "22%", height: "26%" },
  { key: "latam",         left: "16%", top: "44%", width: "20%", height: "42%" },
  { key: "eu",            left: "42%", top: "8%",  width: "16%", height: "18%" },
  { key: "africa",        left: "44%", top: "32%", width: "20%", height: "40%" },
  { key: "gcc",           left: "60%", top: "26%", width: "11%", height: "12%" },
  { key: "asia",          left: "60%", top: "6%",  width: "30%", height: "30%" },
  { key: "oceania",       left: "76%", top: "62%", width: "18%", height: "22%" },
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
            {/* faint grid background */}
            <div className="pointer-events-none absolute inset-0 opacity-30 [background:linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
            {MAP_TILES.map((t) => {
              const region = REGIONS.find((r) => r.key === t.key);
              if (!region) return null;
              const isActive = hovered === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onMouseEnter={() => setHovered(t.key)}
                  onMouseLeave={() => setHovered((cur) => (cur === t.key ? null : cur))}
                  onFocus={() => setHovered(t.key)}
                  onBlur={() => setHovered((cur) => (cur === t.key ? null : cur))}
                  onClick={() => setHovered(t.key)}
                  className={`absolute flex flex-col items-center justify-center rounded-2xl border text-center transition ${
                    isActive
                      ? "border-quantum-cyan bg-quantum-cyan/25 shadow-[0_0_28px_rgba(56,189,248,0.55)]"
                      : "border-quantum-cyan/30 bg-quantum-cyan/8 hover:border-quantum-cyan/60 hover:bg-quantum-cyan/15"
                  }`}
                  style={{ left: t.left, top: t.top, width: t.width, height: t.height }}
                  aria-label={`${region.name} — ${fmt(pricePerToken(region))} per token`}
                >
                  <span className="px-2 text-xs font-semibold uppercase tracking-wider text-fg sm:text-sm">
                    {region.name}
                  </span>
                  <span className="mt-0.5 text-base font-bold text-quantum-cyan sm:text-lg">
                    {fmt(pricePerToken(region))}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted/80 sm:text-xs">
                    / token
                  </span>
                </button>
              );
            })}
          </div>

          {/* Region detail panel */}
          <div className="rounded-3xl border border-line/10 bg-surface/5 p-6">
            {activeRegion ? (
              <>
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
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Select a region
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Move over a region on the map to view its per-token price,
                  rationale and country coverage.
                </p>
              </>
            )}
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

      {/* Bundle tiers + live calculator */}
      <section className="mt-14 grid gap-8 lg:grid-cols-[1.4fr,1fr]">
        <div>
          <h2 className="text-2xl font-bold text-fg">Bundle discounts</h2>
          <p className="mt-2 text-sm text-muted">
            Volume tokens are discounted automatically — applied on top of the
            regional unit price.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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
        </div>

        <div className="rounded-3xl border border-line/10 bg-surface/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Quick estimator
          </p>
          <label className="mt-3 block text-sm text-muted">
            Region
            <select
              defaultValue=""
              onChange={(e) => setHovered(e.target.value || null)}
              className="mt-1 w-full rounded-xl border border-line/10 bg-surface/10 px-3 py-2 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-quantum-cyan/40"
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
