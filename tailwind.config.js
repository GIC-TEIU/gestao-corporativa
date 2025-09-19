/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js', // Inclui os componentes do Flowbite React
  ],
  theme: {
    extend: {
      screens: {
        'xl2': { 'max': '1366px' }, // Breakpoint personalizado
      },
      colors: {
        'brand-black': '#000000',
        'brand-gray-light': '#D9D9D9',
        'brand-blue-dark': '#2A454E',
        'brand-green': '#2F7429',
        'brand-white': '#FFFFFF',
        'brand-gray-medium': '#9E9E9E',
        'brand-gray-dark': '#939393',
        'brand-orange-dark': '#A15305',
        'brand-orange': '#AA5500',
        'brand-off-white': '#EEF1F1',
        'brand-ice-blue': '#DFE9ED',
        'brand-cyan': '#33748B',
        'brand-teal-dark': '#275667',
        'brand-green-dark': '#165507',
        'brand-gray-steel': '#A3A3A3',
        'brand-blue-vivid': '#1A5BB1',
        'brand-gray-concrete': '#D8D6D6',
        'brand-gray-stone': '#7C7C7C',
      },
      boxShadow: {
        azulEscuro: '0 4px 15px rgba(42, 69, 78, 0.5)',
        azulCLaro: '0 4px 15px rgba(51, 119, 142, 0.5)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
  ],
};
