module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      'focus-outline': 'var(--color-focus-outline)',
      primary: {
        100: 'var(--color-primary-100)',
        200: 'var(--color-primary-200)',
        300: 'var(--color-primary-300)',
        600: 'var(--color-primary-600)',
        700: 'var(--color-primary-700)',
        800: 'var(--color-primary-800)',
        900: 'var(--color-primary-900)',
      },
      'button-primary': {
        default: 'var(--color-button-primary)',
        hover: 'var(--color-button-primary-hover)',
        disabled: 'var(--color-button-primary-disabled)',
        'focus-outline': 'var(--color-button-primary-focus-outline)',
      },
      'button-secondary': {
        default: 'var(--color-primary-700)',
        hover: 'var(--color-primary-600)',
        disabled: 'var(--color-primary-600)',
      },
    },
  },
  /* eslint-disable-next-line */
  plugins: [require('tailwind-scrollbar')],
};
