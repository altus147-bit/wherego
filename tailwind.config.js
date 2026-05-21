/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pastel blue / purple accent palette from reference design
        brand: {
          50: '#f3f4ff',
          100: '#e8eaff',
          200: '#d4d8ff',
          300: '#b3baff',
          400: '#8b94ff',
          500: '#6c75ff', // primary action purple
          600: '#5a5ef0',
          700: '#4b48d4',
          800: '#3d3ca8',
          900: '#343485',
        },
        sky2: {
          50: '#f0f7ff',
          100: '#e0efff',
          500: '#3da5ff',
          600: '#2a8be8',
        },
        ink: {
          900: '#1a1d2e',
          700: '#3a3f55',
          500: '#6b7186',
          400: '#9097ad',
          300: '#c1c5d4',
          200: '#e3e6ef',
          100: '#f1f3f8',
          50: '#f8f9fc',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 23, 50, 0.04), 0 8px 24px rgba(20, 23, 50, 0.06)',
        soft: '0 2px 12px rgba(108, 117, 255, 0.08)',
        float: '0 10px 30px rgba(20, 23, 50, 0.10)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
};
