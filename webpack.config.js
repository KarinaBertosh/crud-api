const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server.js",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js",
  },
  target: "async-node",
  mode: "production",
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};
