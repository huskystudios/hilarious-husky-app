module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
        fontFamily: {
            sans: ['Iskara', 'sans-serif'],
        },
        backgroundImage: {
          'light-image': "url('./media/bgfixed1.jpeg')",
          'dark-image': "url('./media/bgfixed.jpeg')",
          
         }
    },
},
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
///background color///#f2f2f2