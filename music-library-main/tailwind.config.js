/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx}", 
  ],
    theme: {
    extend: {
      colors: {
        'melofy-green-dark': '#059669',
        'melofy-green-light': '#10b981',
        'melofy-green-bg': '#dcfce7',
      },
    },
}
};