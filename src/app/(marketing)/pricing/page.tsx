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
import { PricingWorldMap } from "@/components/pricing/PricingWorldMap";

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

        {/* Region legend */}
        <ul className="mt-5 flex flex-wrap gap-2 text-xs">
          {REGIONS.map((r) => {
            const dot: Record<string, string> = {
              "north-america": "bg-[#60a5fa]",
              latam: "bg-[#34d399]",
              eu: "bg-[#a78bfa]",
              africa: "bg-[#fbbf24]",
              gcc: "bg-[#f87171]",
              asia: "bg-[#22d3ee]",
              oceania: "bg-[#f472b6]",
            };
            const isActive = hovered === r.key;
            return (
              <li key={r.key}>
                <button
                  type="button"
                  onClick={() => setHovered((cur) => (cur === r.key ? null : r.key))}
                  onMouseEnter={() => setHovered(r.key)}
                  onMouseLeave={() => setHovered((cur) => (cur === r.key ? null : cur))}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition ${
                    isActive
                      ? "border-quantum-cyan/60 bg-quantum-cyan/10 text-fg"
                      : "border-line/10 bg-surface/5 text-muted hover:text-fg"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${dot[r.key] ?? "bg-slate-400"}`} />
                  <span className="font-medium">{r.name}</span>
                  <span className="text-faint">·</span>
                  <span className="text-quantum-cyan">{fmt(pricePerToken(r))}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl border border-line/10 bg-gradient-to-br from-[#0b1424] via-[#070b14] to-[#0a192b]">
            <PricingWorldMap hovered={hovered} onHover={setHovered} />
            {activeRegion && (
              <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
                <div className="rounded-full border border-quantum-cyan/30 bg-[#05060f]/80 px-4 py-1.5 text-xs font-semibold text-fg backdrop-blur">
                  <span className="text-quantum-cyan">{activeRegion.name}</span>
                  <span className="mx-2 text-faint">·</span>
                  <span>{fmt(pricePerToken(activeRegion))}</span>
                  <span className="ms-1 text-faint">/ token</span>
                </div>
              </div>
            )}
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
