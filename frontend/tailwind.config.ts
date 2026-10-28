import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)', secondary: 'var(--secondary)', accent: 'var(--accent)',
        success: 'var(--success)', danger: 'var(--danger)', bg: 'var(--bg)',
        surface: 'var(--surface)', muted: 'var(--muted)', border: 'var(--border)', ink: 'var(--text)',
      },
      fontFamily: { display: ['Plus Jakarta Sans', 'sans-serif'], sans: ['DM Sans', 'sans-serif'] },
      boxShadow: { soft: 'var(--shadow)' },
      borderRadius: { card: '14px' },
    },
  },
  plugins: [],
} satisfies Config
