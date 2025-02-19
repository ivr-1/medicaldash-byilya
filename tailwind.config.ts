import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css", 
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        active1: "var(--active1)",
        active2: "var(--active2)",
      },
      fontFamily: {
        manrope: ['var(--font-manrope)', 'sans-serif'],
      },
      screens: {
        'sm': '576px',  
        'md': '700px',   
        'lg': '992px',    
        'xl': '1370px',   
        '2xl': '1400px',  
      },
    },
  },
  plugins: [],
} satisfies Config;
