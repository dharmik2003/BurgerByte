import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     
    },
    screens: {
      'sm': '640px',    // Small screens, mobile phones (default)
      'md': '768px',    // Medium screens, tablets
      'lg': '1024px',   // Large screens, laptops/desktops
      'xl': '1280px',   // Extra large screens, large desktops
      '2xl': '1536px',  // Extra large screens, extra large desktops
      'ss': '380', 
    },

  },
  plugins: [],
};
export default config;