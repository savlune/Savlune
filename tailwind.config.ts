import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0a0a0b',
          900: '#111113',
          800: '#1a1a1d',
          700: '#252529',
          600: '#333338',
        },
        offwhite: '#f6f4ef',
        graphite: '#3d3d42',
        mitsubishi: {
          red: '#e60012',
        },
        savlune: {
          gold: '#c9a24b',
          'gold-light': '#e0c47a',
          'gold-dim': '#8a7237',
        },
        silver: '#c7c9cc',
        gunmetal: '#2a2d34',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      maxWidth: {
        content: '1440px',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
    },
  },
  plugins: [],
};

export default config;
