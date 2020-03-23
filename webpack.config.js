const path = require('path');

const rules = [
  { test: /\.(css)|(html)$/, use: "raw-loader" }
];

module.exports = {
  entry: {
    Nbnhhsh: "./dist/nbnhhsh.js",
    App: "./dist/app.js"
  },
  output: { path: path.resolve(__dirname, "dist"), filename: "[name].js" },
  module: { rules }
}
