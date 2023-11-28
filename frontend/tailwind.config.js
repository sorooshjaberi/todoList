/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        melo: "0px 0px 15px -10px",
        meloInner: "inset 0px 0px 37px -30px",
      },
      backgroundColor: {
        glassNormal: "#5a5a5a38",
        glassLight: "#9c9c9c38",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
