/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEF7',
          100: '#F7F3E9',
          200: '#F0E6D2',
          300: '#E8D5B7',
          400: '#DFC49C',
          500: '#D4B483',
          600: '#C8A46A',
          700: '#B89553',
          800: '#A1833E',
          900: '#8B722B'
        },
        sage: {
          50: '#F6F7F6',
          100: '#E8EBE8',
          200: '#D1D8D1',
          300: '#B4C4B4',
          400: '#95B095',
          500: '#759B75',
          600: '#5E825E',
          700: '#4A6B4A',
          800: '#3C5A3C',
          900: '#2F4B2F'
        },
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917'
        }
      },
      fontFamily: {
        'serif': ['Crimson Text', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      }
    },
  },
  plugins: [],
};