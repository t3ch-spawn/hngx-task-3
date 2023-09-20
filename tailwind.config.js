/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        main: 'Poppins'
      },

      screens: {
       
        "-600": { max: "600px" },
        "-350": { max: "350px" },
      },
    },
  },
  plugins: [],
}

