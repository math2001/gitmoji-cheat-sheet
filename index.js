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
            x: Settings.settings.windowX,
            y: Settings.settings.windowY,
            show: false,
            frame: false,
            icon: `${__dirname}/imgs/gitmoji.ico`,
            alwaysOnTop: Settings.settings.alwaysOnTop,
            center: Settings.settings.windowPosCenter,
            title: 'Gitmoji'
        })

        mainWindow.loadURL(`file://${__dirname}/index.html`)

        mainWindow.on('ready-to-show', function () {
            this.show()
        })
    }

    function registerGlobalShortcut(shortcut) {
        globalShortcut.register(shortcut, () => {mainWindow.show()})
    }

    function init() {

        Settings.init()

        createWindow()

        registerGlobalShortcut(Settings.settings.showWindowShortcut)

        tray = new Tray(`${__dirname}/imgs/gitmoji.ico`)
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
        e.sender.send('send-settings', Settings.settings)
    })

    ipc.on('save-settings', (e, settings) => {
        globalShortcut.unregister(Settings.settings.showWindowShortcut)
        Settings.save(settings)
        registerGlobalShortcut(Settings.settings.showWindowShortcut)
        e.sender.send('settings-reloaded', Settings.settings)
    })

}

main()
