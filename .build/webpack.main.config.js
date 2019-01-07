const path = require("path");

const MAIN_PATH = path.resolve(__dirname, "../src/main/");

module.exports = env => {
  return {
    mode: env.NODE_ENV,
    target: "electron-main",
    // target: "node",
    node: {
      __filename: false,
      __dirname: false
    },
    // externals: ["electron", "webpack"],
    entry: {
      main: path.resolve(MAIN_PATH, "./index.js")
    },
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          loader: "babel-loader"
        }
      ]
    },
    devtool:'source-map'
  };
};

