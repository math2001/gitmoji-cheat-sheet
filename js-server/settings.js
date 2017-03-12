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
            'windowHeight': 550
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


    static saveAndApply(settings) {
        // save the settings to the settings file
        // and apply it

        this.settings = this.defaultSettings.extend(settings)
        writeFileSync(this.SETTINGS_FILE, JSON.stringify(settings))

    }


}

module.exports = Settings
