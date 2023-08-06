/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Nunito: ["Nunito", "sans-serif"],
      },
      textUnderlineOffset: {
        8: '5px',
      }
    },
  },
  plugins: [],
}

