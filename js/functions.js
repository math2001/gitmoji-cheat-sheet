"use strict";

function arr(iterable) {
    arr = []
    for (var i = 0; i < iterable.length; i++) {
        arr.push(iterable[i])
    }
    return arr
}

exports.arr = arr
