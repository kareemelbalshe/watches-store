/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        movingDot: {
          "0%": { left: "0%" },
          "25%": { left: "100%" },
          "50%": { left: "75%", boxShadow: "0px 0px 20px 5px rgba(255, 193, 7, 1)" },
          "100%": { left: "0%" },
        },
      },
      
      animation: {
        movingDot: "movingDot 15s infinite ease-in-out",
      },
    },
  },
  plugins: [],
  darkMode: 'class', 
}