/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6d28d2",  
        secondary: "#6d28d2", 
        danger: "#d2caff",
      },
    },
  },
  plugins: [],
}

