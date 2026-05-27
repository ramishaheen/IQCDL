import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // IQCDL brand azure (from the logo)
        brand: {
          50: "#eef8fd",
          100: "#d6eefb",
          200: "#aaddf6",
          300: "#74c7ef",
          400: "#3eaee6",
          500: "#2ba9e0",
          600: "#1d8ec2",
          700: "#1a72a0",
          800: "#1b5d83",
          900: "#1b4d6c",
        },
        // Legacy accent tokens retuned to the brand blue family so existing
        // utility classes shift on-brand automatically.
        quantum: {
          cyan: "#38bdf8",
          blue: "#2ba9e0",
          indigo: "#2ba9e0",
          violet: "#38bdf8",
          magenta: "#5ec6f2",
          pink: "#7dd3fc",
        },
        ink: {
          DEFAULT: "#0f2231",
          soft: "#334155",
        },
        // Theme-adaptive semantic colors (driven by CSS vars; flip per theme).
        fg: "rgb(var(--c-fg) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        faint: "rgb(var(--c-faint) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        arabic: ["var(--font-arabic)", "var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "quantum-radial":
          "radial-gradient(circle at 50% 0%, rgba(43,169,224,0.12), transparent 60%)",
        "quantum-grid":
          "linear-gradient(rgba(43,169,224,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(43,169,224,0.10) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 18px 50px -18px rgba(43,169,224,0.55)",
        "glow-cyan": "0 18px 50px -16px rgba(56,189,248,0.5)",
        card: "0 1px 2px rgba(15,34,49,0.04), 0 16px 40px -24px rgba(15,34,49,0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
