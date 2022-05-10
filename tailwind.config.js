module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dom: '#F7BD3B',
        secondary: '#18253B',
        darkBlue: '#0C1019',
        danger: '#BB0000',
        brightblue: '#0093FF'
      },
      fontFamily: {
        spartan: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
}
