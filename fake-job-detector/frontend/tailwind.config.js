/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#F5F0E8', light: '#FAF7F2', dark: '#EDE5D5' },
        forest: {
          DEFAULT: '#2D4A3E',
          dark: '#1A2E25',
          mid: '#3D5A4F',
          light: '#6B8A7A',
          muted: '#9AB5A8'
        },
        gold: {
          DEFAULT: '#C9A84C',
          dark: '#B8943D',
          light: '#F5E6C0',
          lighter: '#FDF3DC'
        },
        mint: { DEFAULT: '#4CAF7D', light: '#EDFAF3', border: '#A8DFC4' },
        rose: { DEFAULT: '#E05C5C', light: '#FDEFEF', border: '#F5BABA' },
        amber: { DEFAULT: '#E09B3D', light: '#FEF6E7', border: '#F5D89A' },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
}
