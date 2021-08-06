module.exports = {
  // purge: [], // use this during development state
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], // use this during production state
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        Loading: 'Loading 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
       },
       keyframes :{
         Loading :{
          '0%, 100% ':{
            opacity: 0.1,
          },
          '50%': {
            opacity: 0.1,
          }
         }
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('daisyui'),
  ],
  // daisyui: {
  //   styled: true,
  //   themes: false,
  //   rtl: false,
  // },
}
