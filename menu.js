// Create default menu.
const path = require('path')
const electron = require('electron')
const {
    app,
    Menu,
    Tray,
    shell,
    ipcRenderer
} = electron

app.once('ready', function() {
    if (Menu.getApplicationMenu())
        return;
    var template = [{
        label: '编辑',
        submenu: [{
            label: '撤销',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        }, {
            label: '恢复',
            accelerator: 'Shift+CmdOrCtrl+Z',
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            label: '裁剪',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label: '复制',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: '粘贴',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }, {
            type: 'separator'
        }]
    }, {
        label: '视图',
        submenu: [{
            label: '重载页面',
            accelerator: 'CmdOrCtrl+R',
            click: function(item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.reload();
            }
        }, {
            label: '切换全屏',
            accelerator: (function() {
                if (process.platform == 'darwin')
                    return 'Ctrl+Command+F';
                else
                    return 'F11';
            })(),
            click: function(item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
        }, {
            label: '开发视图',
            accelerator: (function() {
                if (process.platform == 'darwin')
                    return 'Alt+Command+I';
                else
                    return 'F12';
            })(),
            click: function(item, focusedWindow) {
                if (focusedWindow)
                    focusedWindow.toggleDevTools();
            }
        }, {
            label: '退出',
            accelerator: 'CmdOrCtrl+W',
            click: function() {
                app.quit();
            }
        }, ]
    }, {
        label: '窗口',
        role: 'window',
        submenu: [{
            label: '最小化',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: '关闭',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }, ]
    }, {
        label: '帮助',
        role: 'help',
        submenu: [{
            label: 'Learn More',
            click: function() {
                shell.openExternal('http://electron.atom.io')
            }
        }, {
            label: '文档',
            click: function() {
                shell.openExternal(
                    `https://github.com/atom/electron/tree/v${process.versions.electron}/docs#readme`
                )
            }
        }, {
            label: 'Community Discussions',
            click: function() {
                shell.openExternal('https://discuss.atom.io/c/electron')
            }
        }, {
            label: 'Search Issues',
            click: function() {
                shell.openExternal('https://github.com/atom/electron/issues')
            }
        }]
    }, ];

    template[3].submenu.push({
        type: 'separator'
    }, {
        label: 'Bring All to Front',
        role: 'front'
    });
    template.unshift({
        label: 'Electron',
        submenu: [{
            label: 'Services',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: 'Hide Electron',
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            role: 'hideothers'
        }, {
            label: 'Show All',
            role: 'unhide'
        }]
    });

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

var appIcon = null;
app.on('ready', function() {
    if (process.platform === 'darwin') {
        appIcon = new Tray(path.join(__dirname, 'images/tray-iconTemplate.png'));
    } else {
        appIcon = new Tray(path.join(__dirname, 'images/tray-icon-alt.png'));
    }
    var trayMenuTemplate = [{
        label: 'Sound machine',
        enabled: false
    }, {
        label: '设置',
        // click: function () {
        //     ipcRenderer.send('open-settings-window');
        // }
    }, {
        label: '关闭',
        click: function() {
            app.quit();
        }
    }];
    var contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    appIcon.setToolTip('王的理想乡！');
    appIcon.setContextMenu(contextMenu);
});
