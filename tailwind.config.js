/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: {
          50: "#eeeed2",
          100: "#d3dab6",
          200: "#becaa0",
          300: "#aabb8b",
          400: "#98ae78",
          500: "#84a064",
          600: "#769656",
          700: "#627f46",
          800: "#4f6936",
          900: "#3b5225",
        },
        chestnut: {
          50: "#f0d9b5",
          100: "#e5cba7",
          200: "#dabb97",
          300: "#cfac88",
          400: "#c49d79",
          500: "#bc916d",
          600: "#b58863",
          700: "#9f7554",
          800: "#856042",
          900: "#6b4b30",
        },
      },
    },
  },
  plugins: [],
};
