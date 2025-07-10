/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Pastikan font utama di-set di sini
      },
      colors: {
        background: "#ffffff",
        foreground: "#000000",
      },
      screens: {
        'sm-125': '512px',
        'md-125': '614px',
        'lg-125': '819px',
        'xl-125': '1024px',
        '2xl-125': '1229px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // Plugin untuk high-DPI detection
    function({ addVariant }) {
      addVariant('high-dpi', '@media (-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)');
    }
  ]
}