/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      platziBG: "#1e2229",
      platziButton: "#0ae98a",
      platziOut: "#1e2229",
    },
  },
  plugins: [],
});
