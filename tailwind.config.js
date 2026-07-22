/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // warm near-black canvas
        base: {
          950: '#131009',
          900: '#171309',
          850: '#1c1710',
          800: '#221c12',
          700: '#2c2517',
        },
        cream: {
          DEFAULT: '#f4efe4',
          dim: '#cfc8b8',
          mut: '#9c9382',
        },
        ember: {
          DEFAULT: '#ff5a1f',
          soft: '#ff7a45',
          deep: '#e0430f',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      opacity: {
        12: '0.12',
        15: '0.15',
        55: '0.55',
        65: '0.65',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
