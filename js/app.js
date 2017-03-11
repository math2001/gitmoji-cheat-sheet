"use strict";

const emojione = require('./js/emojione.min')
const fuzzySearch = require('./js/fuzzy-search')
const Clipboard = require('./js/clipboard')
const Notif = require('./js/notif')
const Emoji = require('./js/emoji')

emojione.shortnameToUnicode_ = (text) =>
    emojione.shortnameToUnicode(text).replace(':memo:', '📝')

;(function () {

    Clipboard.init()
    Emoji.init()
})()
