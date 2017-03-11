"use strict";

// by math2001

// (new FuzzySearch([...]).search('keyword'))

class FuzzySearch {

    constructor(data) {
        // data must be an array of strings
        this.data = data
    }

    _match(pattern, string) {
        var previousIndex = 0;
        let failed = false
        pattern.split('').forEach((letter) => {
            previousIndex = string.indexOf(letter, previousIndex)
            if (previousIndex == -1) {
                failed = true
            }
        })
        return !failed
    }

    search(pattern, onlyIndex=false) {
        let matches = []
        this.data.forEach((string, index) => {
            if (this._match(pattern, string)) {
                if (onlyIndex) {
                    matches.push(index)
                } else {
                    matches.push(string)
                }
            }
        })
        return matches
    }

}

module.exports = FuzzySearch
