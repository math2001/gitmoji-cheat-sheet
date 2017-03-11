"use strict"

const electron = require('electron')
const {app, BrowserWindow, ipcMain: ipc, globalShortcut} = electron
const fs = require('fs')

function main() {

    let mainWindow

    function createWindow() {

        mainWindow = new BrowserWindow({
            width: 350,
            height: 550,
            show: false,
            frame: false,
            icon: `${__dirname}/imgs/gitmoji.ico`
        })

        mainWindow.loadURL(`file://${__dirname}/index.html`)

        mainWindow.on('ready-to-show', () => {
            mainWindow.show()
        })

        mainWindow.on('closed', function () {
            mainWindow = null
        })

        globalShortcut.register('CmdOrCtrl+Shift+E', function () {
            mainWindow.show()
        })

    }

    app.on('ready', createWindow)

    app.on('window-all-closed', () => {
        app.quit();
    })

    ipc.on('hide-window', () => {
        mainWindow.hide()
    })

    ipc.on('shut-down', () => {
        app.quit()
    })

}

main()
