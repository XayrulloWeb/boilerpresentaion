/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050608',
          900: '#08090C',
          850: '#0D0F15',
          800: '#131620',
          700: '#1C2230',
          600: '#283144',
        },
        ember: {
          400: '#FF8833',
          500: '#FF5500',
          600: '#E04800',
          glow: 'rgba(255, 85, 0, 0.45)',
        },
        plasma: {
          300: '#7AFAFF',
          400: '#00F0FF',
          500: '#00C8FF',
          glow: 'rgba(0, 240, 255, 0.4)',
        },
        lcd: {
          bg: '#0F261E',
          text: '#45FF98',
          dim: '#1B6A45',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2.5s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(255, 85, 0, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 35px rgba(255, 85, 0, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
