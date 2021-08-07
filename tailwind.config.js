module.exports = {
  purge: [], // use this during development state
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], // use this during production state
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {

      textColor:{
        skin:{
          base: 'var(--color-text-base)',
          inverted: 'var(--color-text-inverted)',
          muted: 'var(--color-text-muted)',
          white:'var(--color-text-white)',
        },
      },

      // backgrounds and buttons
      backgroundColor:{
        skin:{
          fill: 'var(--color-fill)',
          dark:'var(--color-dark)',
          'button-accent': 'var(--color-button-accent)',
          'button-accent-hover': 'var(--color-button-accent-hover)',
          'button-muted': 'var(--color-button-muted)',
        }
      },


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
