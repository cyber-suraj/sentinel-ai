export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF2FF', 100: '#E0E7FF', 500: '#6366F1',
          600: '#4F46E5', 700: '#4338CA', 900: '#312E81'
        },
        surface: {
          light: '#FFFFFF', muted: '#F8FAFC',
          dark: '#0F172A', darker: '#020617'
        },
        risk: {
          critical: '#DC2626', high: '#EA580C',
          medium: '#F59E0B', low: '#16A34A', safe: '#059669'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: []
}
