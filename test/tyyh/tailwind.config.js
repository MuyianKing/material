export default {
  theme: {
    extend: {},
  },
  important: true,
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@hl/ui/**/*.{vue,jsx,tsx}',
    './node_modules/@hl/task/**/*.{vue,jsx,tsx}',
    '!./node_modules/@hl/tyyh/node_modules/**',
    './node_modules/@hl/tyyh/**/*.{vue,jsx,tsx}',
  ],
  plugins: [],
}
