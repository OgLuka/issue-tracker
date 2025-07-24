import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Semantic design tokens using the provided palette
        // #0F172A, #1E293B, #334155, #CBD5E1, #F1F5F9, #3B82F6, #10B981, #F59E0B, #EF4444

        // Surface colors
        surface: {
          DEFAULT: "#F1F5F9", // Light background
          secondary: "#CBD5E1", // Secondary surfaces
          dark: "#1E293B", // Dark background
          "dark-secondary": "#334155", // Dark secondary surfaces
        },

        // Text colors
        text: {
          primary: "#0F172A", // Primary text on light
          secondary: "#334155", // Secondary text
          "primary-dark": "#F1F5F9", // Primary text on dark
          "secondary-dark": "#CBD5E1", // Secondary text on dark
        },

        // Status colors
        status: {
          open: "#3B82F6", // Blue for open issues
          "in-progress": "#F59E0B", // Amber for in progress
          closed: "#10B981", // Green for closed
        },

        // Accent colors
        accent: {
          primary: "#3B82F6", // Primary blue
          success: "#10B981", // Green
          warning: "#F59E0B", // Amber
          danger: "#EF4444", // Red
        },

        // Border colors
        border: {
          DEFAULT: "#CBD5E1",
          dark: "#334155",
        },
      },

      // Custom spacing for consistent 16px base gap
      spacing: {
        gap: "1rem", // 16px base gap
        "gap-sm": "0.5rem", // 8px
        "gap-lg": "1.5rem", // 24px
        "gap-xl": "2rem", // 32px
      },

      // Animation for slide-over panel
      animation: {
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-out-right": "slideOutRight 0.3s ease-in",
      },

      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
