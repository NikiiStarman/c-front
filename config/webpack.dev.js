const webpackMerge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const commonConfig = require("./webpack.common.js");
const helpers = require("./helpers");

module.exports = webpackMerge(commonConfig, {
  devtool: "cheap-module-eval-source-map",

  output: {
    path: helpers.root("dist"),
    publicPath: "http://localhost:8080/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: "minimal"
  }
});
