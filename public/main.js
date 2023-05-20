const electron = require("electron");
const path = require("path");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
let loadingWindow;

app.on("ready", () => {
  loadingWindow = new BrowserWindow({
    frame: false,
    movable: false,
    scrollBounce: false,
    autoHideMenuBar: true,
    overlayScrollbars: false,
  });

  loadingWindow.once("show", () => {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: { nodeIntegration: true, contextIsolation: false },
      show: false,
      scrollBounce: false,
      autoHideMenuBar: true,
      overlayScrollbars: false,
    });

    mainWindow.webContents.once("dom-ready", () => {
      mainWindow.show();
      loadingWindow.hide();
      loadingWindow.close();
    });
    const icon = path.join(__dirname, "./clipboard.ico");
    mainWindow.setIcon(icon);
    mainWindow.loadURL("http://localhost:3000/");
  });

  loadingWindow.loadFile(path.join(__dirname, "./loader.html"));
  loadingWindow.show();
});

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
