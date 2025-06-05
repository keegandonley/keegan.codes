/** @type {import('tailwindcss').Config} */

const colors = {
  'render-bg': 'rgb(251, 250, 244)',
  'render-text': 'hsla(176.629,97.8022%,17.8431%,1)',
  'render-accent': 'rgb(215, 170, 93)',
  'miami-blue': 'rgb(51, 118, 246)',
  'miami-pink': 'rgb(227, 59, 201)',
  'miami-yellow': 'rgb(245, 188, 67)',
  'miami-bg': 'rgb(38, 42, 104)',
  'neon-blue': '#039dfc',
  'neon-pink': '#fc03b1',
  'sasw-primary': '#322979',
  'sasw-secondary': '#EC228D',
  'render-25-primary': '#FF88DF',
  'render-25-accent': '#711B44',
  sand: 'rgb(240, 229, 206)',
  teal: 'rgb(63, 142, 180)',
  pink: 'rgb(173, 73, 179)',
};

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s linear forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ':root': Object.entries(colors).reduce((acc, [name, value]) => {
          return {
            ...acc,
            [`--color-${name}`]: value,
          };
        }, {}),
      });
    },
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('transitionDelay'),
        },
      );
    },
  ],
};
