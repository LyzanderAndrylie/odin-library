/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["/src/index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        tussock: {
          50: "#faf5ec",
          100: "#f2e8cf",
          200: "#e7d2a1",
          300: "#d9b36b",
          400: "#cd9641",
          500: "#be8234",
          600: "#a3652b",
          700: "#834b25",
          800: "#6e3e25",
          900: "#5e3525",
          950: "#361b12",
        },
      },
      fontFamily: {
          'roboto': ['Roboto', 'sans-serif'],
          'norse-bold': ['Norse-Bold'],
      }
    },
  },
  plugins: [],
};
