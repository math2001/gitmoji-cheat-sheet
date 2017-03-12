"use strict";

function arr(iterable) {
    arr = []
    for (var i = 0; i < iterable.length; i++) {
        arr.push(iterable[i])
    }
    return arr
}

function objectAddExtend() {

    Object.prototype.extend = function(object) {
        let newObject = {}
        Object.keys(this).some((key) => {
            newObject[key] = this[key]
        })
        Object.keys(object).some((key) => {
            if (typeof object[key] != 'undefined') {
                newObject[key] = object[key]
            }
            return false
        })
        return newObject
    }
}

exports.arr = arr
exports.objectAddExtend = objectAddExtend
