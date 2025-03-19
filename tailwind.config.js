/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Safaricom De{c0}dE inspired color scheme
        primary: {
          50: '#e6f7e9',
          100: '#c5ebd0',
          200: '#9fdeb4',
          300: '#6ed295',
          400: '#4ac77e',
          500: '#00BD59', // Safaricom primary green
          600: '#00a74e',
          700: '#009244',
          800: '#007c39',
          900: '#00672e',
        },
        secondary: {
          50: '#e6f2f5',
          100: '#c5dfe5',
          200: '#9fc9d4',
          300: '#75b1c2',
          400: '#4e9fb5',
          500: '#0086A1', // A complementary teal color
          600: '#00768d',
          700: '#006579',
          800: '#005565',
          900: '#004552',
        },
        // Element theme colors from De{c0}dE
        earth: '#8D7B68',      // Earth theme (brown)
        water: '#19A7CE',      // Water theme (blue)
        fire: '#FF6000',       // Fire theme (orange)
        air: '#B6EADA',        // Air theme (light teal)
        dark: '#121212',       // Dark background
        light: '#F5F5F5',      // Light background
        'dark-accent': '#1E1E1E', // Dark accent
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
