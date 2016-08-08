const electron = require('electron');
const {
    app,
    BrowserWindow,
    globalShortcut,
    dialog,
    ipcMain,
    ipcRenderer
} = electron

var mainWindow = null;
app.on('ready', function() {
    var workAreaSize = electron.screen.getPrimaryDisplay().workAreaSize
    if (mainWindow) {
        return;
    }
    mainWindow = new BrowserWindow({
        width: workAreaSize.width * 0.6,
        height: workAreaSize.height * 0.9,
        // autoHideMenuBar: true,
        // useContentSize: true,
        // frame: true,
        // resizable: true,
        // transparent: true,
        // darkTheme: false,
        // maximizable: false, //是否允许最大化
        // fullscreenable: false,
        title: "王的理想乡",
        autoHideMenuBar: true
    })
    mainWindow.loadURL('file://' +__dirname + '/../web/trunk/home.html');
    // mainWindow.loadURL('http://localhost:8888/');
    // mainWindow.webContents.openDevTools(); //打开开发者工具
    // mainWindow.setFullScreen(!mainWindow.isFullScreen());
    // mainWindow.maximize()
    mainWindow.on('closed', function() {
        mainWindow = null;
    })
})

app.on('will-quit', function() {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', function() {
    if (app.listeners('window-all-closed').length == 1)
        app.quit();
});
