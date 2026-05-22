import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1B4FD8",
          primaryDark: "#1740B5",
          primaryLight: "#EEF2FF",
          primaryBorder: "#C7D2FE",
          primaryText: "#3730A3",
        },
        page: "#F9FAFB",
        surface: "#FFFFFF",
        ink: {
          primary: "#111827",
          secondary: "#374151",
          tertiary: "#6B7280",
          muted: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          subtle: "#F3F4F6",
          strong: "#D1D5DB",
        },
        success: "#10B981",
        successBg: "#F0FDF4",
        successText: "#166534",
        warning: "#F59E0B",
        warningBg: "#FFFBEB",
        warningBorder: "#FCD34D",
        warningText: "#92400E",
        danger: "#EF4444",
        dangerBg: "#FEF2F2",
        cat: {
          loan: "#1B4FD8",
          investment: "#0EA5E9",
          tax: "#8B5CF6",
          retirement: "#10B981",
          insurance: "#F59E0B",
          business: "#EF4444",
          currency: "#06B6D4",
          realestate: "#84CC16",
          personal: "#EC4899",
          stocks: "#F97316",
          economics: "#6366F1",
          math: "#0EA5E9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "36px", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "30px", fontWeight: "700" }],
        h3: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        h4: ["16px", { lineHeight: "24px", fontWeight: "600" }],
        body: ["14px", { lineHeight: "22px", fontWeight: "400" }],
        sm: ["13px", { lineHeight: "20px", fontWeight: "400" }],
        xs: ["12px", { lineHeight: "18px", fontWeight: "400" }],
        mini: [
          "10px",
          { lineHeight: "14px", fontWeight: "600", letterSpacing: "0.04em" },
        ],
      },
      maxWidth: {
        page: "1200px",
        prose: "720px",
      },
    },
  },
  plugins: [],
};
export default config;
