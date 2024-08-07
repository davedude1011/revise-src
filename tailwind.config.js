export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "rgb(16, 16, 16)",
          800: "rgb(21, 21, 21)",
          700: "rgb(26, 26, 26)",
          600: "rgb(31, 31, 31)",
          500: "rgb(36, 36, 36)",
          400: "rgb(41, 41, 41)",
          300: "rgb(46, 46, 46)",
          200: "rgb(51, 51, 51)",
          100: "rgb(56, 56, 56)",
        },
        muted: "rgb(108, 117, 125)"
      },},
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("tw-elements-react/dist/plugin.cjs")
  ],
}