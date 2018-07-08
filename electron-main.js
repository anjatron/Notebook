const {app, BrowserWindow, session} = require('electron');
const url = require("url");
const path = require("path");
  
function isDev() {
  return process.env.ELECTRON_ENV === "dev";
}

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let _window;

  
  function createWindow () {
    console.log('create electron window');
    const _session = session.fromPartition('persist:notebook');

    // Create the browser window.
    _window = new BrowserWindow({
      width: 1024, 
      height: 800
    });
    // nodeIntegration: false
  
    // and load the index.html of the app.
    _window.loadFile("dist/index.html");
  
    // Open the DevTools.
    if (isDev()) {
      _window.webContents.openDevTools()
    }
    
    // Emitted when the window is closed.
    _window.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      _window = null
    })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (_window === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.