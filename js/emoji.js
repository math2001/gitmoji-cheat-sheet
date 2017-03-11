"use strict";

const fs = require('fs')

class Emoji {

    static init() {
        this.emojis = document.querySelector('#emojis')
        this.search = document.querySelector('#search')

        fs.readFile(`${__dirname}/../emojis.json`, (err, everyEmojis) => {
            if (err) throw err
            this.everyEmojis = JSON.parse(everyEmojis)
            this.fz = new fuzzySearch(this.everyEmojis.map(function (emoji) {
                return `${emoji[1]} ${emoji[2]}`
            }))
            this.render(this.everyEmojis)
        })

        this.bindDOM()
    }

    static handleInput(e) {
        const indexes = this.fz.search(e.target.value, 'only indexes')
        this.render(this.everyEmojis.filter((element, index) => indexes.includes(index)))
    }

    static handleKeydown(e) {
        if ((['TEXTAREA', 'INPUT']).indexOf(e.target.nodeName) != -1) {
            return
        }
        this.search.focus()
    }

    static handleCopyToClipboard(e) {
        let node = e.target, text = null, i = 0
        while ((text = node.getAttribute('data-clipboard')) === null && node.nodeName != 'BODY' && i < 5) {
            node = node.parentNode
            i++
        }
        e.preventDefault()
        e.stopImmediatePropagation()
        this.copyEmojiAlias(text)
    }

    static copyEmojiAlias(alias) {
        search.value = ''
        Clipboard.copy(alias)
        Notif.show(`📋 Copied <code>${alias}</code> ${emojione.shortnameToUnicode_(alias)}`)
    }

    static bindDOM() {
        this.search.addEventListener('input', this.handleInput.bind(this))
        document.body.addEventListener('keydown', this.handleKeydown.bind(this))
        document.body.addEventListener('dblclick', this.handleCopyToClipboard.bind(this))
    }

    static render(emojis) {
        let html = '';
        emojis.forEach(function (infos) {
            let [alias, usage, keywords] = infos
            keywords = keywords != '' ? `<code class="emoji-keyword">${keywords}</code>` : ''
            let emoji = emojione.shortnameToUnicode_(`:${alias}:`)
            html += `<tr class="emoji" data-clipboard=":${alias}:">
                       <td class="emoji-emoji">${emoji}</td>
                       <td class="emoji-description">${usage}${keywords}</td>
                     </tr>`
        }, this)
        this.emojis.innerHTML = html
    }

}

module.exports = Emoji
