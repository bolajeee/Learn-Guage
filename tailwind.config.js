/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FAFBFC',
        'bg-secondary': '#F3F4F6',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'brand-blue': '#1E40AF',
        'brand-accent': '#0EA5E9',
        'border-color': '#E5E7EB',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
      },
    },
  },
  plugins: [],
};
