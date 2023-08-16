/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Nunito: ["DM Sans", "sans-serif"],
      },
      textUnderlineOffset: {
        8: '5px',
      }
      , backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

