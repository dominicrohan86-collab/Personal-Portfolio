/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem'
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'Menlo', 'SFMono-Regular', 'ui-monospace', 'monospace']
      },
      colors: {
        canvas: {
          DEFAULT: 'hsl(var(--color-canvas) / <alpha-value>)',
          foreground: 'hsl(var(--color-foreground) / <alpha-value>)'
        },
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        muted: 'hsl(var(--color-muted) / <alpha-value>)',
        card: 'hsl(var(--color-card) / <alpha-value>)',
        border: 'hsl(var(--color-border) / <alpha-value>)'
      },
      boxShadow: {
        glow: '0 0 25px hsla(var(--color-accent) / 0.35)',
        card: '0 10px 30px rgba(0,0,0,0.25)'
      },
      backgroundImage: {
        'grid-small': 'linear-gradient(to right, hsla(var(--color-border) / 0.35) 1px, transparent 1px), linear-gradient(to bottom, hsla(var(--color-border) / 0.35) 1px, transparent 1px)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-2px)' },
          '50%': { transform: 'translateY(4px)' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
