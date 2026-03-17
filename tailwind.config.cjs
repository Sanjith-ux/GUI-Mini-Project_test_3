/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out both",
        float: "float 4s ease-in-out infinite",
      },
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#e6ebff",
          200: "#c9d4ff",
          300: "#a1b3ff",
          400: "#6f88ff",
          500: "#4760ff",
          600: "#2f43db",
          700: "#2433ad",
          800: "#202d8d",
          900: "#1d2973"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.12)",
      }
    }
  },
  plugins: []
};
