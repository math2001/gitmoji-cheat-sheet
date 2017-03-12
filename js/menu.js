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
        this.toggleMenu()
        ipc.send('hide-window')
    }

    static shutDown() {
        ipc.send('shut-down')
    }

    static showSettingsWindow() {
        this.toggleMenu()
        EM.emit('show-settings-window')
    }

    static bindDOM() {
        this.mainBtn.addEventListener('click', this.toggleMenu.bind(this))
        this.menu.querySelector('.hide-window').addEventListener('click', this.hideWindow.bind(this))
        this.menu.querySelector('.minimize-window').addEventListener('click', this.minimizeWindow)
        this.menu.querySelector('.shut-down').addEventListener('click', this.shutDown)
        this.menu.querySelector('.show-settings-window').addEventListener('click', this.showSettingsWindow.bind(this))
    }

}

module.exports = Menu
