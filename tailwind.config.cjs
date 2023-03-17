const plugin = require('tailwindcss/plugin')

const gridAreaPlugin = plugin(({ matchUtilities }) => {
  matchUtilities({
    'grid-in': value => {
      return {
        'grid-area': value,
      }
    },
  })
})

const stripePlugin = plugin(({ matchComponents, theme }) => {
  matchComponents(
    {
      stripe: value => ({
        backgroundSize: 'auto auto',
        backgroundColor: 'transparent',
        backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 32px, ${value} 32px, ${value} 36px)`,
      }),
    },
    {
      values: theme('colors'),
    }
  )
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      fern_green: '#628B48',
      puce: '#D8829D',
      mint_green: '#C9EDDC',
      pakistan_green: '#243010',
      black: '#06070E',
    },
    extend: {
      fontFamily: {
        yusei: ['Yusei Magic, sans-serif'],
      },
    },
  },
  plugins: [gridAreaPlugin, stripePlugin],
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
}
