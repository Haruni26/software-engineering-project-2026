/**
 * @file tailwind.config.js
 * @description Configuration file for Tailwind CSS to define custom theme settings, including light and dark mode, custom fonts, and colors.
 * This configuration supports a consistent design language across the Woodland Conservation Site.
 * @author Raish Raj Joshi
 */

const { CgDarkMode } = require("react-icons/cg"); // Import dark mode toggle icon from react-icons.

module.exports = {
  /**
   * @property {string} darkMode - Enables class-based dark mode support.
   */
  darkMode: "class",

  /**
   * @property {string[]} content - Specifies the paths to all files containing Tailwind CSS classes.
   */
  content: ['./index.html', "./src/**/*.{js,jsx,ts,tsx}"],

  /**
   * @property {object} theme - Defines the theme customization for the site.
   * Includes font families, color palettes, and other design tokens.
   */
  theme: {
    extend: {
      /**
       * @property {object} fontFamily - Defines custom font families.
       * 'calibri' is added as the default sans-serif font.
       */
      fontFamily: {
        calibri: ["calibri", "sans-serif"],
      },

      /**
       * @property {object} colors - Specifies the color palette for light and dark modes.
       */
      colors: {
        light: {
          /**
           * @property {string} background - Softer off-white color for light mode background.
           * @property {string} text - Pale yellow text color for better contrast in light mode.
           * @property {string} primary - Primary blue color for accents.
           * @property {string} highlight - Purple highlight color for emphasis.
           * @property {string} border - Light gray border color for subtle outlines.
           */
          background: "#d1f7d1",
          text: "##fffcd3",
          primary: "#3498db",
          highlight: "#a569bd",
          border: "#dfe6e9",
        },
        dark: {
          /**
           * @property {string} background - Deep gray background for dark mode.
           * @property {string} text - Pale yellow text color for readability in dark mode.
           * @property {string} primary - Light blue primary color for accents in dark mode.
           * @property {string} highlight - Deep purple highlight color for emphasis.
           * @property {string} border - Dark gray border color for subtle outlines.
           */
          background: "#1c1f26",
          text: "#fffcd3",
          primary: "#8ab4f8",
          highlight: "#7d3c98",
          border: "#2d323d",
        },
      },
    },
  },

  /**
   * @property {array} plugins - List of plugins for additional functionality.
   * Currently, no plugins are added.
   */
  plugins: [],
};
