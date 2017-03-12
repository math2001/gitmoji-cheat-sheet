"use strict";

const {ipcRenderer: ipc, remote} = require('electron')

class Settings {

    static init() {

        this.settingsWindow = document.querySelector('#settings-window')
        this.closeSettingsWindow = document.querySelector('#close-settings-window')
        this.saveBtn = document.querySelector('#settings-save')
        this.cancelBtn = document.querySelector('#settings-cancel')

        this.alwaysOnTop = this.settingsWindow.querySelector('#always-on-top')
        this.showWindowShortcut = this.settingsWindow.querySelector('#show-window-shortcut')
        this.windowPosCenter = this.settingsWindow.querySelector('#window-pos-center')
        this.windowWidth = this.settingsWindow.querySelector('#window-width')
        this.windowHeight = this.settingsWindow.querySelector('#window-height')
        this.windowX = this.settingsWindow.querySelector('#window-x')
        this.windowY = this.settingsWindow.querySelector('#window-y')

        this.setCurrentPosBtn = this.settingsWindow.querySelector('#set-current-window-pos')
        this.setCurrentSizeBtn = this.settingsWindow.querySelector('#set-current-window-size')

        this.bindEvents()
        this.bindDom()

        ipc.send('get-settings') // ask index.js for the the config (fires the the event 'settings')

    }


    static bindEvents() {
        EM.on('show-settings-window', () => {
            this.settingsWindow.classList.add('active')
        })

        const updateSettings = (settings) => {
            this.settings = settings
            this.render(settings)
            this.apply(settings)
        }

        ipc.on('settings-reloaded', (event, settings) => {
            updateSettings(settings)
            Notif.show(' ⚙ ↺ and applied!')
        })

        ipc.on('send-settings', (event, settings) => {
            updateSettings(settings)
        })


    }

    static bindDom() {
        this.closeSettingsWindow.addEventListener('click', () => {
            this.settingsWindow.classList.remove('active')
        })

        this.cancelBtn.addEventListener('click', () => {
            this.render(this.settings)
            this.settingsWindow.classList.remove('active')
        })

        this.saveBtn.addEventListener('click', () => {
            let settings = this.get()
            this.settings = settings
            this.save(settings)
        })

        this.windowPosCenter.addEventListener('change', (e) => {
            this.windowX.disabled = this.windowY.disabled = e.target.checked
        })

        this.setCurrentPosBtn.addEventListener('click', () => {
            let bounds = remote.getCurrentWindow().getBounds()
            this.windowX.disabled = this.windowY.disabled = false
            this.windowPosCenter.checked = false
            this.windowX.value = bounds.x
            this.windowY.value = bounds.y
        })

        this.setCurrentSizeBtn.addEventListener('click', () => {
            let size = remote.getCurrentWindow().getSize()
            this.windowWidth.value = size[0]
            this.windowHeight.value = size[1]
        })
    }

    static apply(settings) {
        const win = remote.getCurrentWindow()
        win.setAlwaysOnTop(settings.alwaysOnTop)
        win.setBounds({
            x: settings.windowX,
            y: settings.windowY,
            width: settings.windowWidth,
            height: settings.windowHeight
        })
        if (settings.windowPosCenter) win.center()
    }

    static save(settings) {
        ipc.send('save-settings', settings)
    }

    static render(settings) {
        // render the settings on the page (called at initialization)
        this.alwaysOnTop.checked = settings.alwaysOnTop
        this.showWindowShortcut.value = settings.showWindowShortcut

        this.windowWidth.value = settings.windowWidth
        this.windowHeight.value = settings.windowHeight

        this.windowPosCenter.checked = settings.windowPosCenter
        this.windowX.value = settings.windowX
        this.windowY.value = settings.windowY

        if (settings.windowPosCenter) {
            this.windowX.disabled = this.windowY.disabled = true
        }
    }

    static get() {
        // get the settings from the current page
        // return an object

        return {
            'alwaysOnTop': this.alwaysOnTop.checked,
            'showWindowShortcut': this.showWindowShortcut.value != '' ? this.showWindowShortcut.value : undefined,
            'windowPosCenter': this.windowPosCenter.checked,
            'windowWidth': this.windowWidth.value != '' ? parseInt(this.windowWidth.value) : undefined,
            'windowHeight': this.windowHeight.value != '' ? parseInt(this.windowHeight.value) : undefined,
            'windowX': this.windowX.value != '' ? parseInt(this.windowX.value) : undefined,
            'windowY': this.windowY.value != '' ? parseInt(this.windowY.value) : undefined
        }
    }

}

module.exports = Settings
