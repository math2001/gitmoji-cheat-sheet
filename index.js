"use strict"

const electron = require('electron')
const {app, BrowserWindow, ipcMain: ipc, globalShortcut} = electron
const fs = require('fs')

const Settings = require('./js-server/settings')

function main() {

    let mainWindow

    function createWindow() {
        mainWindow = new BrowserWindow({
            width: 350,
            height: 550,
            show: false,
            frame: false,
            icon: `${__dirname}/imgs/gitmoji.ico`,
            alwaysOnTop: Settings.settings.alwaysOnTop
        })

        mainWindow.loadURL(`file://${__dirname}/index.html`)

        mainWindow.on('ready-to-show', function () {
            this.show()
        })
    }

    function init() {

        Settings.init()

        createWindow()

        globalShortcut.register(Settings.settings.showWindowShortcut, function () {
            mainWindow.show()
        })

    }

    app.on('ready', init)

    app.on('window-all-closed', () => {
        app.quit();
    })

    // IPC

    ipc.on('hide-window', () => {
        mainWindow.hide()
    })

    ipc.on('shut-down', () => {
        app.quit()
    })

    ipc.on('get-settings', (e) => {
        e.sender.send('settings', Settings.settings)
    })

    ipc.on('save-and-apply-settings', (e, settings) => {
        Settings.saveAndApply(settings)
        let previousWindow = mainWindow
        createWindow()
        previousWindow.close()
    })

}

main()
