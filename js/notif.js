"use strict";

class Notif {

    static _hideAndRemove() {
        this.notif.classList.add('fade')
        this.previousSecondTimeout = setTimeout(() => {
            this.notif.parentNode.removeChild(this.notif)
            this.notif = null
        }, 500);
    }

    static show(html) {
        if (this.notif) {
            this.notif.parentNode.removeChild(this.notif)
            clearTimeout(this.previousMainTimout)
            clearTimeout(this.previousSecondTimeout)
        }
        this.notif = document.createElement('p')
        this.notif.classList.add('notif')
        this.notif.innerHTML = html
        document.body.appendChild(this.notif)
        this.previousMainTimout = setTimeout(() => {
            this._hideAndRemove()
        }, 2000);
    }

}

module.exports = Notif
