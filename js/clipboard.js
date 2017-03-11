"use strict";

class Clipboard {

    static init() {
        this.textarea = document.createElement('textarea')
        this.textarea.style.position = 'absolute'
        this.textarea.style.top = '-100%'
        this.textarea.style.left = '-100%'
        this.textarea.style.opacity = '0'
        this.textarea.style.width = '0'
        this.textarea.style.height = '0'
        document.body.appendChild(this.textarea)
    }

    static copy(text) {
        this.textarea.value = text
        this.textarea.select()
        document.execCommand('copy')
    }

}

module.exports = Clipboard
