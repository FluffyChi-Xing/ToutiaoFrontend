/** @type {import('tailwindcss').Config} */
export default {
  // purge: [],
  // darkMode: false, // or 'media' or 'class'
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        danger: '#F56C6C',
        primaryText: '#303133',
        white: '#FFFFFF',
        success: '#67C23A',
        warning: '#E6A23C',
        pageBg: '#F2F3F5'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

