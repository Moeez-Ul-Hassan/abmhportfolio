/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Open Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        myfont: ["'Alfa Slab One'"],
        parafont:["'Roboto Mono'"]
      },
      colors: {
        military: {
          green: '#223D26', // deep military green
          dark: '#101418', // near-black
          gray: '#6B7280', // neutral gray
          light: '#F3F4F6', // light gray/white
        },
      },
    },
  },
  plugins: [],
};
