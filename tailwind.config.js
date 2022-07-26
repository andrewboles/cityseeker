module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'display': ['Amiko'],
      'logo': ['Righteous']
    },
    extend: {
      colors: {
        'midnight': '#112f4c',
        'peach': '#fd9676',
        'paleblue': '#1595b1',
        "gray": "#e1e6ea",
        "offwhite": "#FCFDFD",
        "darkdefault": "#2D2E2F"
      }
    },
  },
  plugins: [],
}
