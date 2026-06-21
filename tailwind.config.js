/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Keep existing colors
        primary: '#667eea',
        secondary: '#764ba2',
        // Add custom theme colors from CSS variables
        background: 'var(--color-background)',
        'card-bg': 'var(--color-card-bg)',
        'card-header': 'var(--color-card-header)',
        'card-secondary': 'var(--color-card-secondary)',
        'badge-success': 'var(--color-badge-success)',
        'badge-warning': 'var(--color-badge-warning)',
        'badge-danger': 'var(--color-badge-danger)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-highlight': 'var(--color-text-highlight)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      spacing: {
        '15': '60px',
      },
    },
  },
  plugins: [],
}
