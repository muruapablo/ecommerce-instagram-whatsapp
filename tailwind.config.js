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
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
      },
      colors: {
        sand: {
          50: '#FDFBF7',
          100: '#F9F5ED',
          200: '#F5F0E4',
          300: '#EAE1D0',
          400: '#DFD2BC',
          500: '#C9B99A',
          600: '#B3A088',
          700: '#8C7A66',
          800: '#6B5D4F',
          900: '#4A4039',
        },
        clay: {
          50: '#FCF4F2',
          100: '#F9E9E5',
          200: '#F3D3CB',
          300: '#E8B5A8',
          400: '#DC9685',
          500: '#D17A65',
          600: '#B85F4A',
          700: '#8E4936',
          800: '#643429',
          900: '#3A1F18',
        },
        moss: {
          50: '#F5F7F4',
          100: '#E8ECE6',
          200: '#D4DBD0',
          300: '#B5C0AF',
          400: '#96A58D',
          500: '#7A8A6F',
          600: '#627158',
          700: '#4C5745',
          800: '#363E32',
          900: '#20251E',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#CFCFCF',
          300: '#ACACAC',
          400: '#8A8A8A',
          500: '#666666',
          600: '#4D4D4D',
          700: '#333333',
          800: '#262626',
          900: '#1A1A1A',
        },
        // Vibrant gradient colors
        sunset: {
          orange: '#FF6B35',
          pink: '#F72585',
          purple: '#7209B7',
          blue: '#4895EF',
        },
        twilight: {
          blue: '#667EEA',
          purple: '#764BA2',
          pink: '#F093FB',
          cyan: '#4FACFE',
        },
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #FF6B35 0%, #F72585 50%, #7209B7 100%)',
        'gradient-twilight': 'linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #F093FB 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FF6B35 0%, #F72585 100%)',
        'gradient-cool': 'linear-gradient(135deg, #667EEA 0%, #4FACFE 100%)',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out backwards',
        'fade-in': 'fadeIn 0.5s ease-out backwards',
        'scale-in': 'scaleIn 0.4s ease-out backwards',
        'slide-in-right': 'slideInRight 0.5s ease-out backwards',
        'float': 'float 3s ease-in-out infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'gradient-y': 'gradientY 8s ease infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
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
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(247, 37, 133, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
