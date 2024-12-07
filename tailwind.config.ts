import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF385C',
        secondary: '#00A699',
        'text-primary': '#484848',
        'text-secondary': '#767676'
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config