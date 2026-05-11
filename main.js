const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, // removes File/Edit/View
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile("index.html");
}

// APP START
app.whenReady().then(() => {
  createWindow();

  // CHECK FOR UPDATES
  autoUpdater.checkForUpdatesAndNotify();
});

// UPDATE EVENTS
autoUpdater.on("update-available", () => {
  console.log("Update available...");
});

autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});