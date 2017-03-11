"use strict";

const emojione = require('./js/emojione.min')
const fuzzySearch = require('./js/fuzzy-search')
const Clipboard = require('./js/clipboard')
const Notif = require('./js/notif')
const Emoji = require('./js/emoji')

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
    Emoji.init()

    const header = document.querySelector('header')

    new ScrollListener(Emoji.emojis.parentNode, function (e) {
        if (this.scrollTop > 0) {
            header.classList.add('shadow')
        } else {
            header.classList.remove('shadow')
        }
    })
})()
