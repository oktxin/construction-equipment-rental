/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        primary: "rgb(var(--primary-rgb) / <alpha-value>)",
        secondary: "rgb(var(--secondary-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        border: "rgb(var(--border-rgb) / <alpha-value>)",
        danger: "rgb(var(--danger-rgb) / <alpha-value>)",
        success: "rgb(var(--success-rgb) / <alpha-value>)",
        warning: "rgb(var(--warning-rgb) / <alpha-value>)",
        card: "rgb(var(--card-rgb) / <alpha-value>)",
        cardHover: "rgb(var(--card-hover-rgb) / <alpha-value>)",
        adminBackground: "rgb(var(--admin-background-rgb) / <alpha-value>)",
        adminSurface: "rgb(var(--admin-surface-rgb) / <alpha-value>)",
        primaryStrong: "var(--primary-strong)",
        secondarySoft: "var(--secondary-soft)",
        accentStrong: "var(--accent-strong)",
        dangerStrong: "var(--danger-strong)",
        warningStrong: "var(--warning-strong)",
        adminSurfaceStrong: "var(--admin-surface-strong)",
      },
      boxShadow: {
        industrial: "0 18px 40px rgba(29, 32, 37, 0.10)",
        "industrial-lg": "0 22px 50px rgba(29, 32, 37, 0.14)",
        "industrial-xl": "0 28px 70px rgba(29, 32, 37, 0.18)",
        "industrial-dark": "0 22px 48px rgba(0, 0, 0, 0.28)",
        "industrial-dark-lg": "0 26px 56px rgba(0, 0, 0, 0.36)",
        "industrial-dark-xl": "0 34px 80px rgba(0, 0, 0, 0.42)",
      },
      borderRadius: {
        card: "1rem",
        display: "1.5rem",
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ['"IBM Plex Sans"', "sans-serif"],
        sans: ['"IBM Plex Sans"', "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
