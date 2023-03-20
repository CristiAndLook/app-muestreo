const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../out/index.html")}`;

  mainWindow.loadURL(url);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
