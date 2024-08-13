/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

/** @type {import("webpack").Configuration} */
const config = {
  mode: "production",
  target: "node",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.join(process.cwd(), "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(process.cwd(), "tsconfig.json"),
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(m?js|tsx?)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  externals: [nodeExternals()],
};

module.exports = config;
