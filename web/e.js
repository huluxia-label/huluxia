const {
  app,
  BrowserWindow,
} = require('electron')
const path = require('path')
const url = require('url')
let win
createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 700
  })
  win.loadURL(`http://localhost:3000/huluxia.html`)
  win.webContents.openDevTools()
  win.webContents.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8');
  win.on('closed', () => {
    win = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (win === null) {
    createWindow()
  }
})
