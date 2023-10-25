module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        short: { raw: '(max-height: 650px)' },
        xshort: { raw: '(max-height: 560px)' },
        xxshort: { raw: '(max-height: 490px)' },
      },
      fontFamily: { // Add this block
        'poiret': ['Poiret'],  // Replace 'YourFontName' with your font's name from the @font-face declaration
        'lato': ['Lato'],
        'lato-bold':['Lato-Bold'],
        'lato-light':['Lato-Light'],
        'sail':['sail']
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
