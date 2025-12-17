/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cham-red': '#DC2626',
        'cham-red-dark': '#B91C1C',
        'cham-gray': '#6B7280',
        'cham-gray-light': '#F3F4F6',
      },
      fontFamily: {
        'reem-kufi': ['Reem Kufi', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}