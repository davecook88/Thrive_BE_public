module.exports = {
  // purge: [], // use this during development state
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], // use this during production state
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    styled: true,
    themes: false,
    rtl: false,
  },
}
