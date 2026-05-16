/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        bone: {
          DEFAULT: 'var(--color-bone)',
          soft: 'var(--color-bone-soft)',
          cream: 'var(--color-cream)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          deep: 'var(--color-accent-deep)'
        },
        text: {
          DEFAULT: 'var(--color-text-on-dark)',
          dark: 'var(--color-text-on-light)',
          muted: 'var(--color-text-muted)'
        },
        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)'
        }
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace']
      },
      maxWidth: {
        container: '1440px'
      },
      fontSize: {
        h1: 'var(--size-h1)',
        h2: 'var(--size-h2)',
        h3: 'var(--size-h3)',
        lead: 'var(--size-lead)',
        caption: 'var(--size-caption)'
      },
      letterSpacing: {
        tightish: 'var(--tracking-tight)',
        widish: 'var(--tracking-wide)'
      }
    }
  },
  plugins: []
};
