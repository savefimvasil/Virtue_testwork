import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        surface: '#F8FAFC',
        border: '#E8EEF7',
        text: {
          primary: '#2D3748',
          secondary: '#A0AEC0',
          muted: '#CBD5E0',
        },
        teal: {
          DEFAULT: '#4FD1C5',
          soft: '#76E4F7',
          dark: '#2C7A7B',
        },
        navy: {
          DEFAULT: '#1A1F37',
          soft: '#2D3748',
        },
        success: '#48BB78',
        warning: '#F6AD55',
        danger: '#F56565',
      }
    },
  },
} satisfies Config
