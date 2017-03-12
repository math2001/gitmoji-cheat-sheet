"use strict";

class Settings {

    static init() {

        this.settingsWindow = document.querySelector('#settings-window')
        this.closeSettingsWindow = document.querySelector('#close-settings-window')

        this.bindEvents()
        this.bindDom()
    }

    static bindEvents() {
        EM.on('show-settings-window', () => {
            this.settingsWindow.classList.add('active')
        })
    }

    static bindDom() {
        this.closeSettingsWindow.addEventListener('click', () => {
            this.settingsWindow.classList.remove('active')
        })
    }

}


module.exports = Settings
