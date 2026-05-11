const { app, BrowserWindow } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  // AUTO UPDATE
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on("update-downloaded", () => {
    autoUpdater.quitAndInstall();
  });
});