module.exports = {
    darkMode: 'class',

    content: [
      "./layouts/**/*.{html,md}",
      "./content/**/*.{html,md}",
      "./themes/**/layouts/**/*.{html,md}",
      "./content/**/layouts/**/*.{html,md}",
    ],
    theme: {
      extend: {}
    },
    plugins: [
      require('@tailwindcss/typography'),
    ]
  }