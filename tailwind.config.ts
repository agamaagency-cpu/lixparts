import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          50: "#f6f7f8",
          100: "#eceef0",
          200: "#d5d9dd",
          300: "#b0b7bf",
          400: "#848e99",
          500: "#66707c",
          600: "#515a64",
          700: "#434a52",
          800: "#3a3f46",
          900: "#23262b",
          950: "#141619",
        },
        accent: {
          DEFAULT: "#0b6bcb",
          soft: "#1e88e5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20,22,25,0.04), 0 8px 24px rgba(20,22,25,0.06)",
        card: "0 1px 2px rgba(20,22,25,0.05), 0 12px 32px rgba(20,22,25,0.08)",
        lift: "0 20px 50px rgba(20,22,25,0.14)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
