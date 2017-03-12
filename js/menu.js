"use strict";

const {ipcRenderer: ipc} = require('electron')

class Menu {

    static init() {
        this.menu = document.querySelector('.menu')
        this.mainBtn = this.menu.querySelector('.menu-main')

        this.bindDOM()
    }

    static toggleMenu() {
        this.menu.classList.toggle('expanded')
    }

    static hideWindow() {
        ipc.send('hide-window')
    }

    static shutDown() {
        ipc.send('shut-down')
    }

    static showSettingsWindow() {
        EM.emit('show-settings-window')
        this.toggleMenu()
    }

    static bindDOM() {
        this.mainBtn.addEventListener('click', this.toggleMenu.bind(this))
        this.menu.querySelector('.hide-window').addEventListener('click', this.hideWindow)
        this.menu.querySelector('.minimize-window').addEventListener('click', this.minimizeWindow)
        this.menu.querySelector('.shut-down').addEventListener('click', this.shutDown)
        this.menu.querySelector('.show-settings-window').addEventListener('click', this.showSettingsWindow.bind(this))
    }

}

module.exports = Menu
