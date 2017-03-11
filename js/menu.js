"use strict";

const {ipcRenderer: ipc} = require('electron')

class Menu {

    static init() {
        this.menu = document.querySelector('.menu')
        this.mainBtn = this.menu.querySelector('.menu-main')

        this.bindDOM()
    }

    static expandMenu() {
        this.menu.classList.toggle('expanded')
    }

    static hideWindow() {
        ipc.send('hide-window')
    }

    static bindDOM() {
        this.mainBtn.addEventListener('click', this.expandMenu.bind(this))
        this.menu.querySelector('.hide-window').addEventListener('click', this.hideWindow)
        this.menu.querySelector('.minimize-window').addEventListener('click', this.minimizeWindow)
    }

}

module.exports = Menu
