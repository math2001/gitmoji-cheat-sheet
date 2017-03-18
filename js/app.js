"use strict";

const {ipcRenderer: ipc, shell} = require('electron')

const emojione = require('./js/emojione.min')

const fuzzySearch = require('./js/fuzzy-search')

const EM = require('./js/event-emitter')
const Clipboard = require('./js/clipboard')
const Notif = require('./js/notif')
const Emoji = require('./js/emoji')
const Menu = require('./js/menu')
const Settings = require('./js/settings')

emojione.shortnameToUnicode_ = (text) =>
    emojione.shortnameToUnicode(text).replace(':memo:', '📝')

class ScrollListener {
    constructor(el, fn) {
        const _this = this
        el.addEventListener('scroll', function(e) {
            _this.last_known_scroll_position = window.scrollY
            if (!_this.ticking) {
                window.requestAnimationFrame(function() {
                    fn.call(el, _this.last_known_scroll_position)
                    _this.ticking = false
                })
            }
            _this.ticking = true
        })
    }
}

;(function () {

    Clipboard.init()
    Notif.init()
    Emoji.init()
    Menu.init()
    Settings.init()

    const header = document.querySelector('header')

    function handleHideWindow() {
        ipc.send('hide-window')
    }

    new ScrollListener(Emoji.emojis.parentNode, function (e) {
        if (this.scrollTop > 0) {
            header.classList.add('shadow')
        } else {
            header.classList.remove('shadow')
        }
    })

    document.body.addEventListener('click', function (e) {
        if (e.target.nodeName == 'A' && e.target.getAttribute('target') == 'browser' && e.target.href) {
            e.preventDefault()
            shell.openExternal(e.target.href)
        }
    })


})()
