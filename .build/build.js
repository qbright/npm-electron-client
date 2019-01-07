const webpack = require("webpack");
const chalk = require("chalk");
const del = require("del");
const path = require("path");
const fs = require("fs");
const printWebpackOutput = require("./printWebpackOutput");
const merge = require("webpack-merge");

const MAIN_CONFIG = require("./webpack.main.config");
const RENDERER_CONFIG = require("./webpack.renderer.config");

let rendererConfig = merge(RENDERER_CONFIG(process.env), {
  devtool: ""
});

let mainConfig = merge(MAIN_CONFIG(process.env), {
  devtool: ""
});

let rendererCompiler = webpack(rendererConfig);
let mainCompiler = webpack(mainConfig);

del.sync(path.resolve(__dirname, "../dist/*")); //clean dist
fs.copyFileSync(
  path.resolve(__dirname, "../package.json"),
  path.resolve(__dirname, "../dist/package.json")
);

rendererCompiler.run((err, stats) => {
  if (!err) {
    printWebpackOutput(
      stats,
      "-----------------------building Renderer-----------------------",
      "-----------------------Renderer builded------------------------",
      chalk.black.bgBlue
    );
  } else {
    console.error(err);
  }
});

mainCompiler.run((err, stats) => {
  if (!err) {
    printWebpackOutput(
      stats,
      "-----------------------building Main-----------------------",
      "-----------------------Main builded------------------------",
      chalk.black.bgGreen
    );
  } else {
    console.error(err);
  }
});
