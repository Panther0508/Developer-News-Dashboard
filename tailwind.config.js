/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        secondary: "#0a0a0a",
        card: "#111111",
        border: "#1f1f1f",
        gold: {
          DEFAULT: "#D4AF37",
          primary: "#D4AF37",
          accent: "#FFD700",
          light: "#F5D15F",
        },
        black: {
          DEFAULT: "#000000",
          50: "#111111",
          100: "#1a1a1a",
          200: "#262626",
          300: "#333333",
        },
        text: {
          primary: "#EAEAEA",
          muted: "#9CA3AF",
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.2)',
        'gold-glow-hover': '0 0 30px rgba(212, 175, 55, 0.4)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
        'pattern': "url('/pattern.svg')", // Optional, can be empty or a repeat
      },
    },
  },
  plugins: [],
}
