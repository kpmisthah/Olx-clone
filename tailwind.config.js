
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}', // TypeScript files
    './node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}', // Flowbite-react content
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Flowbite plugin
  ],
};