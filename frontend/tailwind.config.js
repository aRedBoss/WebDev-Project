// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#3B6161',
        primary: "#ff5733",
        secondary: "#33ff57",
        darkBlue: "#1e3a8a",
      }
    },
  },
  plugins: [],
}
