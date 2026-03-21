/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#13132b',
        workspace: '#0f0f1a',
        surface: '#1a1a2e',
        card: 'rgba(255,255,255,0.04)',
        emerald: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399'
        },
        navy: {
          DEFAULT: '#e2e8f0',
          dark: '#94a3b8',
          light: '#f8fafc'
        },
        violet: {
          DEFAULT: '#8b5cf6',
        },
        teal: {
          DEFAULT: '#14b8a6',
        },
        coral: {
          DEFAULT: '#ef4444',
          light: '#fca5a5'
        },
        amber: {
          DEFAULT: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient': 'gradient-shift 4s ease infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'counter': 'counter-up 0.3s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'counter-up': {
          from: { transform: 'translateY(6px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
}
