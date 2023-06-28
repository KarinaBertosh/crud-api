const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server.ts",
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
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
