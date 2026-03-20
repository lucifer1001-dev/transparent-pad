const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: false,
    resizable: true,
    webPreferences: {
      preload: __dirname + '/preload.js',
      spellcheck: false // ✅ disable grammar/spell check
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  // Toggle show/hide
  globalShortcut.register('CommandOrControl+Shift+Space', () => {
    if (!win) return;

    if (win.isVisible()) win.hide();
    else win.show();
  });
});

// Close app from renderer
ipcMain.on('close-app', () => {
  if (win) win.close();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});