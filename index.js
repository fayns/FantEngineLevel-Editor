
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { shell } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1153,
    height: 556,
    resizable: false, 
    fullscreenable: false, 
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, './indexHub.html'));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        },
        // Другие пункты меню "File"
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          click: () => {
            shell.openExternal('');
          
          }
        },
        {
          label: 'About',
          click: () => {
              mainWindow = new BrowserWindow({
                width: 371,
                height: 138,
                resizable: false, 
                fullscreenable: false, 
                frame: false,
                webPreferences: {
                  nodeIntegration: true,
                }
              });
            mainWindow.loadFile(path.join(__dirname, './About.html'));
          
          
          }
        },
        
      ]
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
