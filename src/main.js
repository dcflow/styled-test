/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

var path = require("path");
var { app, BrowserWindow } = require("electron");

let mainWindow = null;

app.on("ready", async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1075,
    height: 850
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.on("did-finish-load", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
