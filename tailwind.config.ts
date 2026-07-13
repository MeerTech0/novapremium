import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nova': {
          '50': '#f9f7f4',
          '100': '#f3f0eb',
          '200': '#e7e1d7',
          '300': '#dbd3c3',
          '400': '#c4b5a0',
          '500': '#ad977d',
          '600': '#9b8567',
          '700': '#7d6d52',
          '800': '#5f5843',
          '900': '#3d3b36',
        },
        'dark': {
          '900': '#0a0e27',
          '800': '#0f1629',
          '700': '#131829',
          '600': '#1a2038',
          '500': '#232d47',
        },
      },
      backgroundColor: {
        'glass': 'rgba(15, 22, 41, 0.7)',
        'glass-dark': 'rgba(10, 14, 39, 0.8)',
      },
      backdropBlur: {
        'md': '12px',
        'xl': '20px',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(173, 151, 125, 0.1)',
        'glow-lg': '0 0 60px rgba(173, 151, 125, 0.15)',
        'soft': '0 10px 40px rgba(0, 0, 0, 0.3)',
        'soft-lg': '0 20px 60px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(173, 151, 125, 0.1)' },
          '50%': { boxShadow: '0 0 60px rgba(173, 151, 125, 0.3)' },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}
export default config
