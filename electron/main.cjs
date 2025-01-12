const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'), // 可选，处理与渲染进程的安全通信
      // 安全设置 https://www.electronjs.org/docs/latest/tutorial/security
      nodeIntegration: true,
      // nodeIntegration，默认false，允许渲染进程使用Node.js API。
      contextIsolation: false,
      // contextIsolation，隔离网站与预加载和electron。https://www.electronjs.org/docs/latest/tutorial/context-isolation
      webSecurity: false,
      // webSecurity，same-origin policy，allowRunningInsecureContent
      sandbox: false,
      // sandbox，限制渲染器用的。https://www.electronjs.org/docs/latest/tutorial/sandbox。当nodeIntegration启用
      // 的时候会自动关闭
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173'); // Vite 默认端口
    mainWindow.webContents.openDevTools(); // 开发环境打开开发者工具
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
