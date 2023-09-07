/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "input-focus": "#2d8cf0",
        "font-color": "#323232",
        "font-color-sub": "#666",
        "bg-color": "#fff",
        "main-color": "#323232",
      }
    },
  },
  plugins: [],
}

