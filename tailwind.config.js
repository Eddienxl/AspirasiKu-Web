/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#003087', // Biru UIN
        accent: '#FFD700',  // Kuning UIN
        secondary: '#F5F5F5',
      },
    },
  },
  plugins: [],
}