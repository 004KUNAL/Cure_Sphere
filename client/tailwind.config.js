/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0ea5e9",
          dark: "#0369a1",
          light: "#7dd3fc",
        },
        secondary: {
          DEFAULT: "#14b8a6",
          dark: "#0f766e",
          light: "#99f6e4",
        },
        accent: "#22c55e",
        dark: "#0f172a",
        light: "#f8fafc",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
