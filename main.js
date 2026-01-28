const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
require("dotenv").config();

const { BacktraceClient } = require("@backtrace/electron");

const client = BacktraceClient.initialize({
  url: process.env.BACKTRACE_URL,
  captureUnhandledErrors: true,
  captureUnhandledPromiseRejections: true,
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("report-error-to-backtrace", (event, errorData) => {
    const errorToSend = new Error(errorData.message);

    errorToSend.name = errorData.name;

    if (errorData.stack) {
      errorToSend.stack = errorData.stack;
    }

    console.log("Sending to Backtrace with stack:", errorToSend.stack);

    client.send(errorToSend);
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
