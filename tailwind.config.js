module.exports = {
  // mode: 'jit',
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
          darkmode:'var(--color-darkmode)',
          'button-accent': 'var(--color-button-accent)',
          'button-accent-hover': 'var(--color-button-accent-hover)',
          'button-muted': 'var(--color-button-muted)',
        }
      },


      animation: {
        Loading: 'Loading 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Nothing: 'Loading 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },


       keyframes :{
         Loading :{
          '0%, 100% ':{
            opacity: 0.1,
          },
          '50%': {
            opacity: 0.1,
          }
         },

        
       }
    },
  },
  variants: {
    extend: {
      filter: ['dark'],
      sepia: ['dark'],
      grayscale:['dark'],
      opacity:['dark'],
      'animate-none':['dark'],
      
    },
  },
  plugins: [],
}
