/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  // this shit overwrites all of the shit
  theme: {
    // sans is the default font of tailwind so we're basically overwriting errting
    fontFamily: { sans: 'Roboto Mono, monospace' }, //monospace = fallback font if first shit isnt available

    // this just adds in on the existing shit and basically extends
    extend: {
      height: { screen: '100dvh' }, // d (dvj) for dynamic, modern shit}
      fontSize: { huge: ['80rem', { lineHeight: '1' }] },
    },
    plugins: [],
  },
};
// all the properties we can customize
// https://github.com/tailwindlabs/tailwindcss/blob/main/stubs/config.full.js
