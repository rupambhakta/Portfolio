/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Every color is a CSS variable so the three themes (ember / light /
      // dark) can swap the whole palette without touching a single class.
      // Values live in index.css under :root[data-theme='…'].
      // `base` = surfaces, `cream` = text, `ember` = accent.
      colors: {
        base: {
          950: 'rgb(var(--c-base-950) / <alpha-value>)',
          900: 'rgb(var(--c-base-900) / <alpha-value>)',
          850: 'rgb(var(--c-base-850) / <alpha-value>)',
          800: 'rgb(var(--c-base-800) / <alpha-value>)',
          700: 'rgb(var(--c-base-700) / <alpha-value>)',
        },
        cream: {
          DEFAULT: 'rgb(var(--c-fg) / <alpha-value>)',
          dim: 'rgb(var(--c-fg-dim) / <alpha-value>)',
          mut: 'rgb(var(--c-fg-mut) / <alpha-value>)',
        },
        ember: {
          DEFAULT: 'rgb(var(--c-ember) / <alpha-value>)',
          soft: 'rgb(var(--c-ember-soft) / <alpha-value>)',
          deep: 'rgb(var(--c-ember-deep) / <alpha-value>)',
        },
        // Text that sits on top of an ember fill.
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        // Status accents — readable in every theme.
        ok: {
          DEFAULT: 'rgb(var(--c-ok) / <alpha-value>)',
          strong: 'rgb(var(--c-ok-strong) / <alpha-value>)',
        },
        warn: 'rgb(var(--c-warn) / <alpha-value>)',
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
