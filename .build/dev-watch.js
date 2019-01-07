const webpack = require("webpack");
const chalk = require("chalk");
const del = require("del");
const path = require("path");
const kill = require("./kill");
const printWebpackOutput = require("./printWebpackOutput");
const MAIN_CONFIG = require("./webpack.main.config");
const RENDERER_CONFIG = require("./webpack.renderer.config");
const electronReloadStart = require("./electron.handler");

let rendererCompiler = webpack(RENDERER_CONFIG(process.env));
let mainCompiler = webpack(MAIN_CONFIG(process.env));

let electronChildProcess;

del.sync(path.resolve(__dirname, "../dist/*")); //clean dist

rendererCompiler.watch({}, (err, stats) => {
  if (!err) {
    printWebpackOutput(
      stats,
      "-----------------------Renderer Watch-----------------------",
      "---------------------Renderer Watch End---------------------",
      chalk.black.bgBlue
    );
    electronChildProcess &&
      !electronChildProcess.closed &&
      electronChildProcess.send("RELOAD");
  } else {
    console.error(err);
  }
});
mainCompiler.watch({}, (err, stats) => {
  if (!err) {
    printWebpackOutput(
      stats,
      "-------------------------Main Watch-------------------------",
      "---------------------Renderer Watch End---------------------",
      chalk.black.bgGreen
    );
    restartElectronMainProcess();
  } else {
    console.error(err);
  }
});

function restartElectronMainProcess() {
  if (electronChildProcess) {
    kill(electronChildProcess.pid);
  }
  setTimeout(() => {
    electronChildProcess = electronReloadStart();
  }, 100);
}
