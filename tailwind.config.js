/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f4eb',
          100: '#cce9d7',
          200: '#99d3af',
          300: '#66bd87',
          400: '#33a75f',
          500: '#007A33', // Exact Zemgales green
          600: '#006229',
          700: '#00491f',
          800: '#003114',
          900: '#00180a',
        },
        white: '#FFFFFF', // Zemgales white
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};