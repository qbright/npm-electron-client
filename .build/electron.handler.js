const { fork } = require("child_process");
const chalk = require("chalk");
const ElectronExecPath = require("electron");
const path = require("path");
const cwd = path.resolve(__dirname, "../");

function start() {
  const f = fork(
    // "electron --inspect-brk=40076 dist/main.js",
    "dist/main.js",
    {
      cwd,
      execPath: ElectronExecPath
      // execArgv: ["--inspect=40076"]
    }
  );

  f.on("close", (code, signal) => {
    console.log(
      chalk.black.bgYellow(
        `[electron:${f.pid}:close] code:${code} signal:${signal}`
      )
    );
  });

  f.on("error", e => {
    console.log(chalk.white.bgRed(`[electron:${f.pid}:error]`, e));
  });
  f.on("message", msg => {
    console.log(chalk.white.bgBlue(`[electron:${f.pid}:message]`, msg));
  });

  return f;
}

module.exports = start;
