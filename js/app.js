"use strict";

const emojione = require('./js/emojione.min')

;(function () {

    const all_emojis = [
        ['art', 'Improving structure / format of the code.'],
        ['zap', 'Improving performance.'],
        ['fire', 'Removing code or files.'],
        ['bug', 'Fixing a bug.'],
        ['ambulance', 'Critical hotfix.'],
        ['sparkles', 'Introducing new features.'],
        ['memo', 'Writing docs.'],
        ['rocket', 'Deploying stuff.'],
        ['lipstick', 'Updating the UI and style files.'],
        ['tada', 'Initial commit.'],
        ['white_check_mark', 'Adding tests.'],
        ['lock', 'Fixing security issues.'],
        ['apple', 'Fixing something on macOS.'],
        ['penguin', 'Fixing something on Linux.'],
        ['checkered_flag', 'Fixing something on Windows.'],
        ['bookmark', 'Releasing / Version tags.'],
        ['rotating_light', 'Removing linter warnings.'],
        ['construction', 'Work in progress.'],
        ['green_heart', 'Fixing CI Build.'],
        ['arrow_down', 'Downgrading dependencies.'],
        ['arrow_up', 'Upgrading dependencies.'],
        ['construction_worker', 'Adding CI build system.'],
        ['chart_with_upwards_trend', 'Adding analytics or tracking code.'],
        ['hammer', 'Refactoring code.'],
        ['heavy_minus_sign', 'Removing a dependency.'],
        ['whale', 'Work about Docker.'],
        ['heavy_plus_sign', 'Adding a dependency.'],
        ['wrench', 'Changing configuration files.'],
        ['globe_with_meridians', 'Internationalization and localization.'],
        ['pencil2', 'Fixing typos.'],
        ['hankey', 'Writing bad code that needs to be improved.'],
        ['rewind', 'Reverting changes.'],
        ['twisted_rightwards_arrows', 'Merging branches.'],
        ['package', 'Updating compiled files or packages.'],
        ['alien', 'Updating code due to external API changes.'],
        ['truck', 'Moving or renaming files.'],
        ['page_facing_up', 'Adding or updating license.'],
        ['boom', 'Introducing breaking changes.'],
        ['bento', 'Adding or updating assets.'],
        ['ok_hand', 'Updating code due to code review changes.'],
        ['wheelchair', 'Improving accessibility.']
    ]

    const table = document.querySelector('#emojis')

    function renderTable(emojis) {
        let html = '';
        emojis.forEach(function (infos) {
            let [alias, usage] = infos
            let emoji = emojione.shortnameToUnicode(`:${alias}:`).replace(':memo:', '📝')
            html += `<tr class="emoji" data-clipboard=":${alias}:">
                       <td class="emoji-emoji">${emoji}</td>
                       <td class="emoji-description">${usage}</td>
                     </tr>`
        }, this)
        table.innerHTML = html
    }

    renderTable(all_emojis)

})()
