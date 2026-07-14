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
        primary: {
          DEFAULT: '#D4AF37', // Map primary action color to Gold
        },
        secondary: {
          DEFAULT: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#D4AF37',
        },
        background: '#050505',
        backgroundSecondary: '#0B0B0B',
        cardBg: '#111111',
        glassBg: 'rgba(255, 255, 255, 0.05)',
        borderGlass: 'rgba(255, 255, 255, 0.08)',
        text: '#FFFFFF',
        textSecondary: 'rgba(255, 255, 255, 0.70)',
        accentGold: '#D4AF37',
        hoverGold: 'rgba(212, 175, 55, 0.18)',
        successGreen: '#2ECC71',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        numbers: ['Space Grotesk', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 20px 60px rgba(0, 0, 0, 0.6)',
        'card-hover': '0 20px 60px rgba(212, 175, 55, 0.15)',
        'glow': '0 0 30px rgba(212, 175, 55, 0.15)',
        'navbar-shadow': '0 10px 40px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F3D3E' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
