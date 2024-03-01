/** @type {import('tailwindcss').Config} */

const colors = {
  "render-bg": "rgb(251, 250, 244)",
  "render-text": "hsla(176.629,97.8022%,17.8431%,1)",
  "render-accent": "rgb(215, 170, 93)",
  "miami-blue": "rgb(51, 118, 246)",
  "miami-pink": "rgb(227, 59, 201)",
  "miami-yellow": "rgb(245, 188, 67)",
  "miami-bg": "rgb(38, 42, 104)",
  "neon-blue": "#039dfc",
  "neon-pink": "#fc03b1",
};

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ":root": Object.entries(colors).reduce((acc, [name, value]) => {
          return {
            ...acc,
            [`--color-${name}`]: value,
          };
        }, {}),
      });
    },
  ],
};
