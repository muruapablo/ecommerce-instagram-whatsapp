/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        headline: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tighter-print': '-0.02em',
      },
      colors: {
        // MonoBoutique Design System
        primary: {
          DEFAULT: '#000000',
          container: '#3b3b3b',
          fixed: '#5e5e5e',
          'fixed-dim': '#474747',
        },
        secondary: {
          DEFAULT: '#006d2f',
          container: '#50f17f',
          fixed: '#3de273',
          'fixed-dim': '#00c55b',
        },
        tertiary: {
          DEFAULT: '#00443c',
          container: '#008376',
          fixed: '#006b5f',
          'fixed-dim': '#005047',
        },
        surface: {
          DEFAULT: '#f9f9f9',
          dim: '#dadada',
          bright: '#f9f9f9',
          'container-lowest': '#ffffff',
          'container-low': '#f3f3f3',
          container: '#eeeeee',
          'container-high': '#e8e8e8',
          'container-highest': '#e2e2e2',
          variant: '#e2e2e2',
          tint: '#5e5e5e',
        },
        on: {
          primary: '#e2e2e2',
          'primary-container': '#ffffff',
          'primary-fixed': '#ffffff',
          'primary-fixed-variant': '#e2e2e2',
          secondary: '#ffffff',
          'secondary-container': '#002109',
          'secondary-fixed': '#002109',
          'secondary-fixed-variant': '#00461b',
          tertiary: '#8ff4e3',
          'tertiary-container': '#ffffff',
          'tertiary-fixed': '#ffffff',
          'tertiary-fixed-variant': '#8ff4e3',
          surface: '#1a1c1c',
          'surface-variant': '#474747',
          background: '#1a1c1c',
          error: '#ffffff',
          'error-container': '#410002',
        },
        inverse: {
          primary: '#c6c6c6',
          surface: '#2f3131',
          'on-surface': '#f1f1f1',
        },
        outline: {
          DEFAULT: '#777777',
          variant: '#c6c6c6',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        background: '#f9f9f9',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #000000 0%, #3b3b3b 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #006d2f 0%, #00461b 100%)',
      },
      spacing: {
        '0.5': '0.125rem',
        '1.4': '0.35rem',
        '5.5': '1.375rem',
      },
      borderRadius: {
        'md': '0.375rem', // 6px - MonoBoutique standard
      },
      backdropBlur: {
        'xs': '2px',
        'boutique': '15px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out backwards',
        'fade-in': 'fadeIn 0.5s ease-out backwards',
        'scale-in': 'scaleIn 0.4s ease-out backwards',
        'slide-in-right': 'slideInRight 0.5s ease-out backwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'ambient': '0 24px 40px -4px rgba(26, 28, 28, 0.06)',
        'ambient-lg': '0 32px 48px -8px rgba(26, 28, 28, 0.08)',
      },
    },
  },
  plugins: [],
}
