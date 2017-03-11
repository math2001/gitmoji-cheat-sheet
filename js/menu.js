"use strict";

class Menu {

    static init() {
        this.menu = document.querySelector('.menu')
        this.mainBtn = this.menu.querySelector('.menu-main')

        this.bindDOM()
    }

    static expandMenu() {
        this.menu.classList.toggle('expanded')
    }

    static bindDOM() {
        this.mainBtn.addEventListener('click', this.expandMenu.bind(this))
    }

}

module.exports = Menu
