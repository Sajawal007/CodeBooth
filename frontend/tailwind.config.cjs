/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,ts,jsx,tsx}","./src/**/*.{html, js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'offwhite': {
          100:'rgb(233,225,207)'
        },
        'fav_blue': {
          100:'rgb(15,30,55)'
        },
        'fav_dark': {
          100:'rgb(44,47,51)'
        },
        'fade_text':{
          100:'rgb(85,93,104)'
        }
      },
    },
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
};
