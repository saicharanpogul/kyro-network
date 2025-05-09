import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-kallisto)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
