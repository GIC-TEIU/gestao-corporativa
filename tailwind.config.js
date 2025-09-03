/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};