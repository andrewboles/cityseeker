module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'display': ['Plus Jakarta Sans'],
    },
    extend: {
      colors: {
        'eggwhite': '#e6dfcd',
        'cobalt': '#35498b',
        'stone-blue': '#23292f',
        'ash': '#e0e1da',
        'moss': '#8A8936',
        'lime': '#82C91E',
        'pink': '#E64980'
      }
    },
  },
  plugins: [],
}
