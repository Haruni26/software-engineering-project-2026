const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "u22hgi",

  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {},
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    indexHtmlFile: "cypress/support/component-index.html",
  },
});


// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {},
//   },
//   component: {
//     devServer: {
//       framework: "react",
//       bundler: "vite",
//     },
//     indexHtmlFile: "cypress/support/component-index.html",
//   },
// });

