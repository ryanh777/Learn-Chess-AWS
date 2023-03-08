/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
     extend: {
        colors: {
           bgprimary: "#312e2b",
           bgsecondary: "#272522",
           bgtertiary: "#21201d",
           button: "#52514e",
           buttonDelete: "#c30a03",
           buttonHover: "#83817c",
           textprimary: "#d4d3d3",
        },
     },
  },
  plugins: [],
};
