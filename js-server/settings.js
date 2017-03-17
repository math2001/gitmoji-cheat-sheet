"use strict";

const {readFileSync, existsSync: exists, writeFileSync} = require('fs')
require('../js/functions').objectAddExtend()


class Settings {

    static init() {

        this.SETTINGS_FILE = `${__dirname}/../settings.json`
        this.defaultSettings = {
            'alwaysOnTop': false,
            'showWindowShortcut': 'CmdOrCtrl+shift+e',
            'windowPosCenter': true,
            'windowWidth': 350,
            'windowHeight': 550,
            'windowX': 50,
            'windowY': 50,
            'hideOnCopy': false
        }
        this.settings = this.defaultSettings.extend(this.loadSettings())
    }

    static loadSettings() {
        // load from the settings file
        // return an object
        if (!exists(this.SETTINGS_FILE)) {
            return {}
        }
        return JSON.parse(readFileSync(this.SETTINGS_FILE))
    }


    static save(settings) {
        // save the settings to the settings file

        this.settings = this.defaultSettings.extend(settings)
        writeFileSync(this.SETTINGS_FILE, JSON.stringify(settings, null, ' '.repeat(4)))

    }


}

module.exports = Settings
