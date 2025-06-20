/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
       fontFamily: {
        myfont: ["'Alfa Slab One'"],
        parafont:["'Roboto Mono'"]
      },
    },
  },
  plugins: [],
};
