import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds - Elegant Purple/Blue Theme
        'midnight-purple': '#1a0f3e',
        'royal-purple': '#2d1b5e',
        'royal-purple-light': '#3d2575',
        'deep-indigo': '#200174',

        // Brand periwinkle (replacing teal)
        'periwinkle': '#6b5ce7',
        'periwinkle-light': '#9b8af5',
        'periwinkle-dark': '#4d3dd0',
        'lavender': '#b8a9f0',

        // Coral accent (replacing gold)
        'coral': '#ff6b4a',
        'coral-light': '#ff9f85',
        'coral-dark': '#e55a3a',

        // Hot Pink accent
        'hot-pink': '#FF1493',
        'hot-pink-light': '#FF69B4',
        'hot-pink-dark': '#DB147F',

        // Legacy aliases for gradual migration
        'deep-navy': '#1a0f3e',
        'navy-light': '#2d1b5e',
        'navy-lighter': '#3d2575',
        'healthspan-teal': '#6b5ce7',
        'teal-dark': '#4d3dd0',
        'teal-glow': '#9b8af5',
        'gold': '#ff6b4a',
        'gold-light': '#ff9f85',
        'gold-dim': '#e55a3a',

        // Neutrals
        'off-white': '#F8F9FA',
        'text-primary': '#1A1A2E',
        'text-secondary': '#4A5568',
        'text-light': '#E2E8F0',
        'text-muted': '#94A3B8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subsection': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scroll-indicator': 'scrollIndicator 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'gradient-xy': 'gradientXY 15s ease infinite',
        'shine': 'shine 1s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(107, 92, 231, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(107, 92, 231, 0.6)' },
        },
        scrollIndicator: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(10px)', opacity: '0.5' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientXY: {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #1a0f3e 0%, #2d1b5e 50%, #1a0f3e 100%)',
        'periwinkle-gradient': 'linear-gradient(135deg, #6b5ce7 0%, #9b8af5 100%)',
        'lavender-gradient': 'linear-gradient(135deg, #b8a9f0 0%, #6b5ce7 100%)',
        'coral-gradient': 'linear-gradient(135deg, #ff6b4a 0%, #ff9f85 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(107, 92, 231, 0.2) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(255, 107, 74, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(184, 169, 240, 0.15) 0px, transparent 50%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(26, 15, 62, 0.2)',
        'card-hover': '0 8px 40px rgba(26, 15, 62, 0.3)',
        'glow-periwinkle': '0 0 30px rgba(107, 92, 231, 0.4)',
        'glow-coral': '0 0 30px rgba(255, 107, 74, 0.4)',
        'glow-hot-pink': '0 0 30px rgba(255, 20, 147, 0.4)',
        'glow-lavender': '0 0 30px rgba(184, 169, 240, 0.3)',
        'inner-glow': 'inset 0 0 30px rgba(107, 92, 231, 0.15)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}
export default config
