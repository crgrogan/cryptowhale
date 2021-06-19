const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  entry: {
    index: "./static/js/index.js",
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: "./static/assets/brand-logo.png",
      cache: true,
    }),
  ],
};
