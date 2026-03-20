/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#1a2b3c',
        workspace: '#f4f7f6',
        emerald: {
          DEFAULT: '#00a896',
          dark: '#008b7d',
          light: '#33b9aa'
        },
        navy: {
          DEFAULT: '#1a2b3c',
          dark: '#121e2a',
          light: '#2d4a66'
        },
        coral: {
          DEFAULT: '#ef4444', // using tailwind red-500 as standard coral red
          light: '#fca5a5'
        },
        amber: {
          DEFAULT: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
