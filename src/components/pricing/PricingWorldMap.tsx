"use client";

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import worldGeo from "world-atlas/countries-110m.json";

// Topojson country `name` → region key (matches REGIONS in src/lib/pricing.ts).
// Names that are too small to appear in countries-110m (Bahrain, Singapore,
// Hong Kong) are omitted — they only show in the per-country table.
const COUNTRY_TO_REGION: Record<string, string> = {
  // Africa
  Algeria: "africa",
  Cameroon: "africa",
  "Côte d'Ivoire": "africa",
  Egypt: "africa",
  Ethiopia: "africa",
  Ghana: "africa",
  Kenya: "africa",
  Morocco: "africa",
  Nigeria: "africa",
  Rwanda: "africa",
  Senegal: "africa",
  "South Africa": "africa",
  Tanzania: "africa",
  Tunisia: "africa",
  Uganda: "africa",
  // LATAM
  Argentina: "latam",
  Brazil: "latam",
  Chile: "latam",
  Colombia: "latam",
  "Costa Rica": "latam",
  "Dominican Rep.": "latam",
  Ecuador: "latam",
  Mexico: "latam",
  Panama: "latam",
  Peru: "latam",
  Uruguay: "latam",
  // Asia (ex-GCC)
  Bangladesh: "asia",
  China: "asia",
  India: "asia",
  Indonesia: "asia",
  Japan: "asia",
  Malaysia: "asia",
  Pakistan: "asia",
  Philippines: "asia",
  "South Korea": "asia",
  "Sri Lanka": "asia",
  Taiwan: "asia",
  Thailand: "asia",
  Vietnam: "asia",
  // Oceania
  Australia: "oceania",
  Fiji: "oceania",
  "New Zealand": "oceania",
  "Papua New Guinea": "oceania",
  // EU + UK
  Austria: "eu",
  Belgium: "eu",
  Czechia: "eu",
  Denmark: "eu",
  Finland: "eu",
  France: "eu",
  Germany: "eu",
  Greece: "eu",
  Hungary: "eu",
  Ireland: "eu",
  Italy: "eu",
  Netherlands: "eu",
  Norway: "eu",
  Poland: "eu",
  Portugal: "eu",
  Spain: "eu",
  Sweden: "eu",
  Switzerland: "eu",
  "United Kingdom": "eu",
  // North America
  Canada: "north-america",
  "United States of America": "north-america",
  // GCC
  Kuwait: "gcc",
  Oman: "gcc",
  Qatar: "gcc",
  "Saudi Arabia": "gcc",
  "United Arab Emirates": "gcc",
};

// Base fills per region, plus brighter "active" variants for hover/selection.
const REGION_FILL: Record<string, string> = {
  "north-america": "rgba(96, 165, 250, 0.42)",
  latam: "rgba(52, 211, 153, 0.42)",
  eu: "rgba(167, 139, 250, 0.42)",
  africa: "rgba(251, 191, 36, 0.42)",
  gcc: "rgba(248, 113, 113, 0.45)",
  asia: "rgba(34, 211, 238, 0.42)",
  oceania: "rgba(244, 114, 182, 0.42)",
};

const REGION_FILL_ACTIVE: Record<string, string> = {
  "north-america": "rgba(96, 165, 250, 0.85)",
  latam: "rgba(52, 211, 153, 0.85)",
  eu: "rgba(167, 139, 250, 0.85)",
  africa: "rgba(251, 191, 36, 0.85)",
  gcc: "rgba(248, 113, 113, 0.9)",
  asia: "rgba(34, 211, 238, 0.85)",
  oceania: "rgba(244, 114, 182, 0.85)",
};

const NEUTRAL_FILL = "rgba(120, 150, 180, 0.10)";

interface GeographyFeature {
  rsmKey: string;
  properties: { name?: string };
}

export function PricingWorldMap({
  hovered,
  onHover,
}: {
  hovered: string | null;
  onHover: (key: string | null) => void;
}) {
  return (
    <div className="absolute inset-0">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165, center: [10, 10] }}
        width={1000}
        height={500}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup disablePanning zoom={1}>
          {/* faint ocean background to read as a map */}
          <rect x={-1000} y={-500} width={3000} height={1500} fill="#0a1422" />
          <Geographies geography={worldGeo as unknown as object}>
            {({ geographies }: { geographies: GeographyFeature[] }) =>
              geographies.map((geo) => {
                const name = geo.properties?.name ?? "";
                const region = COUNTRY_TO_REGION[name];
                const isActive = !!region && hovered === region;
                const fill = region
                  ? isActive
                    ? REGION_FILL_ACTIVE[region]
                    : REGION_FILL[region]
                  : NEUTRAL_FILL;
                const stroke = region
                  ? "rgba(56, 189, 248, 0.55)"
                  : "rgba(56, 189, 248, 0.18)";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isActive ? 0.9 : 0.4}
                    onMouseEnter={() => region && onHover(region)}
                    onMouseLeave={() => region && onHover(null)}
                    onFocus={() => region && onHover(region)}
                    onBlur={() => region && onHover(null)}
                    onClick={() => region && onHover(region)}
                    style={{
                      default: {
                        outline: "none",
                        transition: "fill 180ms ease, stroke-width 180ms ease",
                      },
                      hover: {
                        outline: "none",
                        cursor: region ? "pointer" : "default",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
