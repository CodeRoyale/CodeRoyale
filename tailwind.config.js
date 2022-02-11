module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: {
        100: 'var(--color-primary-100)',
        200: 'var(--color-primary-200)',
        300: 'var(--color-primary-300)',
        600: 'var(--color-primary-600)',
        700: 'var(--color-primary-700)',
        800: 'var(--color-primary-800)',
        900: 'var(--color-primary-900)',
      },
      buttonPrimary: {
        default: 'var(--color-button-primary)',
        hover: 'var(--color-button-primary-hover)',
        disabled: 'var(--color-button-primary-disabled)',
      },
    },
  },
  plugins: [],
};
