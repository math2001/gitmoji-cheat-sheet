"use strict";

// by math2001

// case-insensitive fuzzy searcher
// (new FuzzySearch([...])).search('keyword')

class FuzzySearch {

    constructor(data) {
        // data must be an array of strings
        this.data = data
        this.lowerData = data.map(str => str.toLowerCase())
    }

    _match(pattern, string) {
        var previousIndex = 0;
        let failed = false
        pattern.split('').forEach((letter, index, arr) => {
            if (arr[index-1] == letter) {
                previousIndex++
            }
            previousIndex = string.indexOf(letter, previousIndex)
            if (previousIndex == -1) {
                failed = true
            }
        })
        return !failed
    }

    search(pattern, onlyIndex=false) {
        let matches = []
        pattern = pattern.toLowerCase()
        this.lowerData.forEach((string, index) => {
            if (this._match(pattern, string)) {
                if (onlyIndex) {
                    matches.push(index)
                } else {
                    matches.push(this.data[index])
                }
            }
        })
        return matches
    }

}

module.exports = FuzzySearch
