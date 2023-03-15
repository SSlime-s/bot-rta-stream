const plugin = require('tailwindcss/plugin')

const gridAreaPlugin = plugin(function ({ matchUtilities }) {
  matchUtilities({
    'grid-in': value => {
      return {
        'grid-area': value,
      }
    },
  })
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
  plugins: [gridAreaPlugin],
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
}
