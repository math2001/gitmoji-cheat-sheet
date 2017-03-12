"use strict";

class EventEmitter {

    static init() {
        this.events = {}
    }

    static on(type, func) {
        if (typeof this.events[type] == 'undefined') {
            this.events[type]= []
        }
        this.events[type].push(func)
    }

    static emit(type, data) {
        if (typeof this.events[type] == 'undefined') {
            throw new Error(`No listener for this event: '${type}'`)
        }

        this.events[type].forEach((func) => {
            func(data)
        })
    }

    static off(type, func) {
        if (typeof this.events[type] == 'undefined') {
            throw new Error(`No listener for this event: '${type}`)
        }

        this.events[type] = this.events[type].filter(fn => fn != func)
    }

}

EventEmitter.init()

module.exports = EventEmitter
