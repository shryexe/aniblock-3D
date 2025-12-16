/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        accent: '#8b5cf6',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}

