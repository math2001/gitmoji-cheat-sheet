"use strict";

const {ipcRenderer: ipc} = require('electron')

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

        this.bindEvents()
        this.bindDom()
    }


    static bindEvents() {
        EM.on('show-settings-window', () => {
            this.settingsWindow.classList.add('active')
        })

        ipc.on('settings', (event, settings) => {
            this.settings = settings
            this.render(settings)
        })

        ipc.send('get-settings') // ask index.js for the the config (fires the the event 'settings')
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
            ipc.send('save-and-apply-settings', this.get())
        })
    }

    static render(settings) {
        // render the settings on the page (called at initialization)
        this.alwaysOnTop.checked = settings.alwaysOnTop
        this.showWindowShortcut.value = settings.showWindowShortcut

        this.windowPosCenter.checked = settings.windowPosCenter
        this.windowWidth.value = settings.windowWidth
        this.windowHeight.value = settings.windowHeight
    }

    static get() {
        // get the settings from the current page
        // return an object

        return {
            'alwaysOnTop': this.alwaysOnTop.checked,
            'showWindowShortcut': this.showWindowShortcut.value != '' ? this.windowWidth.value : undefined,
            'windowPosCenter': this.windowPosCenter.checked,
            'windowWidth': this.windowWidth.value != '' ? parseInt(this.windowWidth.value) : undefined,
            'windowHeight': this.windowHeight.value != '' ? parseInt(this.windowHeight.value) : undefined,
        }
    }

}

module.exports = Settings
