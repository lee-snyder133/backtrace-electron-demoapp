const { contextBridge, ipcRenderer } = require("electron");

console.log("Preload initialized. Setting up Bridge...");

contextBridge.exposeInMainWorld("backtraceApi", {
  send: (errorOrMessage) => {
    const payload = {
      message: errorOrMessage.message || String(errorOrMessage),
      name: errorOrMessage.name || "Error",
      stack: errorOrMessage.stack || new Error().stack,
    };

    console.log("Bridge sending with Stack:", payload);
    ipcRenderer.send("report-error-to-backtrace", payload);
  },
});
