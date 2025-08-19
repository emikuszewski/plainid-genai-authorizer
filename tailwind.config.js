/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'plainid-teal': '#00A7B5',
        'deep-teal': '#002A3A',
        'misty-teal': '#D1E4E5',
        'icy-gray': '#EEF1F4',
        'cloudy-gray': '#BFCED6',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
