/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FBFCFE',
        'bg-secondary': '#EEF3F8',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
        'brand-blue': '#1E3A8A',
        'brand-accent': '#0EA5E9',
        'brand-ink': '#0B1220',
        'surface': '#FFFFFF',
        'surface-muted': '#F8FAFC',
        'border-color': '#D7DFE8',
        'success': '#15803D',
        'warning': '#B45309',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
      },
      boxShadow: {
        soft: '0 18px 60px rgba(15, 23, 42, 0.08)',
        glow: '0 18px 50px rgba(30, 58, 138, 0.18)',
      },
    },
  },
  plugins: [],
};
