/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       
    "./pages/**/*.{js,ts,jsx,tsx}",     
    "./components/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        textprimary: 'var(--color-primary)',
        textsecondary: 'var(--color-secondary)',
        textbackground: 'var(--color-background)',
      },
      fontFamily: {
        magseva: ['Magseva', 'sans-serif'],
      },
    },
  },
  plugins: [
    
    plugin(function({ addUtilities }) {
      addUtilities({
        '.bg-page-light': {
          backgroundImage: 'var(--color-background)',
        },
        '.bg-page-dark': {
          backgroundImage: 'var(--color-background)',
        },
      })
    }),
  ],
}
