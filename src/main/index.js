import { app, BrowserWindow } from "electron";
import path from "path";
let mainWindow;
let isDevelopment = process.env.NODE_ENV === "development";
function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadFile(path.resolve(__dirname, "./index.html"));
  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);



//使用child_process fork 子进程进行调试, 用process.send 和 nodejs 进程进行通信，达到重载页面的目的

// don't delete
if (isDevelopment) {
  process.on("message", msg => {
    if (msg === "RELOAD") {
      mainWindow && mainWindow.reload();
    }
  });
}
