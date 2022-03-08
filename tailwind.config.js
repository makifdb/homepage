module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};