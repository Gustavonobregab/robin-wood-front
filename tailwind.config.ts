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
        // --- SUAS CORES ORIGINAIS ---
        'robin-green': {
          '50': '#f0fdf4',
          '100': '#dcfce7',
          '200': '#bbf7d0',
          '300': '#86efac',
          '400': '#4ade80',
          '500': '#22c55e',
          '600': '#16a34a',
          '700': '#15803d',
          '800': '#166534',
          '900': '#14532d',
          '950': '#052e16'
        },
        'robin-red': {
          '50': '#fef2f2',
          '100': '#fee2e2',
          '200': '#fecaca',
          '300': '#fca5a5',
          '400': '#f87171',
          '500': '#ef4444',
          '600': '#dc2626',
          '700': '#b91c1c',
          '800': '#991b1b',
          '900': '#7f1d1d',
          '950': '#450a0a'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        
        'brand': {
          'primary': '#16a34a',      // green-600 (mesma cor do Logo)
          'primary-hover': '#15803d', // green-700 (mesma cor do texto WOOD)
          'primary-dark': '#14532d',  // green-900 (mais escuro)
          'primary-light': '#22c55e', // green-500 (mais claro)
          'primary-bg': '#f0fdf4',    // green-50
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        manrope: ['"Manrope"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #121212',
        'hard-sm': '2px 2px 0px 0px #121212',
        'hard-xl': '8px 8px 0px 0px #121212',
      },

      // --- ANIMAÇÕES ---
      animation: {
        marquee: 'marquee 70s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: 'float 6s ease-in-out infinite',

        // !!! ADIÇÃO IMPORTANTÍSSIMA: AS FLECHAS !!!
        'arrow-fly-1': 'flyRight 15s linear infinite',
        'arrow-fly-2': 'flyRight 20s linear infinite',
        'arrow-fly-3': 'flyRight 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },

        // !!! ADIÇÃO IMPORTANTÍSSIMA: O MOVIMENTO DAS FLECHAS !!!
        flyRight: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(150vw) translateY(100px)' }, 
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}

export default config