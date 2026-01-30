import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // === DESIGN SYSTEM COLORS ===
        // Primary Brand: Green
        brand: {
          DEFAULT: '#16a34a',     // green-600 - primary
          light: '#22c55e',       // green-500
          dark: '#15803d',        // green-700
          darker: '#14532d',      // green-900
          bg: '#f0fdf4',          // green-50 - backgrounds
          muted: '#dcfce7',       // green-100 - subtle backgrounds
        },
        // We use Tailwind's built-in slate for neutrals
        // slate-50 to slate-900 are available by default
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        manrope: ['"Manrope"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'fade': 'fadeIn 0.4s ease-out forwards',
        'fade-delay-1': 'fadeIn 0.4s ease-out 0.1s forwards',
        'fade-delay-2': 'fadeIn 0.4s ease-out 0.2s forwards',
        'marquee': 'marquee 70s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
