"use strict";

const emojione = require('./js/emojione.min')
const fuzzySearch = require('./js/fuzzy-search')
const Clipboard = require('./js/clipboard')
const Notif = require('./js/notif')

;(function () {

    const all_emojis = [
        // alias, description, keyword (for the researching)
        ['art',                       'Improving structure / format of the code.',  ''],
        ['zap',                       'Improving performance.',                     'perfs'],
        ['fire',                      'Removing code or files.',                    '-'],
        ['bug',                       'Fixing a bug.',                              ''],
        ['ambulance',                 'Critical hotfix.',                           'urgent'],
        ['sparkles',                  'Introducing new features.',                  '+'],
        ['memo',                      'Writing docs.',                              'comment'],
        ['rocket',                    'Deploying stuff.',                           ''],
        ['lipstick',                  'Updating the UI and style files.',           'css'],
        ['tada',                      'Initial commit.',                            ''],
        ['white_check_mark',          'Adding tests.',                              ''],
        ['lock',                      'Fixing security issues.',                    ''],
        ['apple',                     'Fixing something on macOS.',                 'osx'],
        ['penguin',                   'Fixing something on Linux.',                 ''],
        ['checkered_flag',            'Fixing something on Windows.',               'that was hard'],
        ['bookmark',                  'Releasing / Version tags.',                  ''],
        ['rotating_light',            'Removing linter warnings.',                  ''],
        ['construction',              'Work in progress.',                          ''],
        ['green_heart',               'Fixing CI Build.',                           ''],
        ['arrow_down',                'Downgrading dependencies.',                  ''],
        ['arrow_up',                  'Upgrading dependencies.',                    ''],
        ['construction_worker',       'Adding CI build system.',                    ''],
        ['chart_with_upwards_trend',  'Adding analytics or tracking code.',         ''],
        ['hammer',                    'Refactoring code.',                          'going to bed now'],
        ['heavy_minus_sign',          'Removing a dependency.',                     'YEESS!'],
        ['whale',                     'Work about Docker.',                         ''],
        ['heavy_plus_sign',           'Adding a dependency.',                       ''],
        ['wrench',                    'Changing configuration files.',              ''],
        ['globe_with_meridians',      'Internationalization and localization.',     ''],
        ['pencil2',                   'Fixing typos.',                              'oooops'],
        ['hankey',                    'Writing bad code that needs to be improved.', 'shit'],
        ['rewind',                    'Reverting changes.',                         'go back'],
        ['twisted_rightwards_arrows', 'Merging branches.',                          ''],
        ['package',                   'Updating compiled files or packages.',       '1101000110010111011001101100110111110000011101111101111111001011011001100100'],
        ['alien',                     'Updating code due to external API changes.', ''],
        ['truck',                     'Moving or renaming files.',                  ''],
        ['page_facing_up',            'Adding or updating license.',                ''],
        ['boom',                      'Introducing breaking changes.',              'non compatible'],
        ['bento',                     'Adding or updating assets.',                 'image sound'],
        ['ok_hand',                   'Updating code due to code review changes.',  ''],
        ['wheelchair',                'Improving accessibility.',                   'altruist']
    ]

    const table = document.querySelector('#emojis')
    const search = document.querySelector('#search')

    const fz = new fuzzySearch(all_emojis.map(function (emoji) {
        return `${emoji[1]} ${emoji[2]}`
    }))

    function renderEmojis(emojis) {
        let html = '';
        emojis.forEach(function (infos) {
            let [alias, usage, keywords] = infos
            keywords = keywords != '' ? `<code class="emoji-keyword">${keywords}</code>` : ''
            let emoji = emojione.shortnameToUnicode(`:${alias}:`).replace(':memo:', '📝')
            html += `<tr class="emoji" data-clipboard=":${alias}:">
                       <td class="emoji-emoji">${emoji}</td>
                       <td class="emoji-description">${usage}${keywords}</td>
                     </tr>`
        }, this)
        table.innerHTML = html
    }

    function updateEmojis() {
        const indexes = fz.search(this.value, 'only indexes')
        renderEmojis(all_emojis.filter((element, index) => indexes.includes(index)))
    }

    function handleCopyToClipboard(e) {
        window.e = e
        let node = e.target, text = null, i = 0
        while ((text = node.getAttribute('data-clipboard')) === null && node.nodeName != 'BODY' && i < 5) {
            node = node.parentNode
            i++
        }
        e.preventDefault()
        Clipboard.copy(text)
        Notif.show(`📋 Copied <code>${text}</code> ${emojione.shortnameToUnicode(text)}`)
    }

    Clipboard.init()
    search.addEventListener('input', updateEmojis)
    document.body.addEventListener('contextmenu', handleCopyToClipboard)

    renderEmojis(all_emojis)

})()
