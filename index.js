"use strict"

const electron = require('electron')
const {app, BrowserWindow, ipcMain: ipc, globalShortcut, Tray} = electron
const fs = require('fs')

const Settings = require('./js-server/settings')

function main() {

    let mainWindow, tray

    function createWindow() {
        mainWindow = new BrowserWindow({
            width: Settings.settings.windowWidth,
            height: Settings.settings.windowHeight,
            show: false,
            frame: false,
            icon: `${__dirname}/imgs/gitmoji.ico`,
            alwaysOnTop: Settings.settings.alwaysOnTop,
            center: Settings.settings.windowPosCenter
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

        tray = new Tray('imgs/gitmoji.ico')
        tray.setToolTip("Gitmoji cheat sheet")
        tray.on('click', () => {
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
