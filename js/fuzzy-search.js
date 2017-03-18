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
        // 0 is the best score you can get
        // the score changes depending if the letter follows themself
        // for the pattern 'hew' 'helloworld' has a better score than 'hello world'

        if (pattern == string) {
            return 0
        } else if (pattern.length > string.length) {
            return null
        }
        let previousIndex = -1, score = 0, index = 0;
        pattern.split('').some((letter, index, arr) => {
            if (letter == arr[index-1]) {
                previousIndex ++
            }
            index = string.indexOf(letter, previousIndex != -1 ? previousIndex : 0)
            if (index == -1) {
                score = null
                return true
            } else if (previousIndex != -1) {
                score += (previousIndex - index + 1) * 0.5
            } else {
                score += (previousIndex - index + 1)
            }
            previousIndex = index
        })
        return score
    }

    search(pattern, onlyIndex=false) {
        let matches = {}
        pattern = pattern.toLowerCase()
        this.lowerData.forEach((string, index) => {
            let score = this._match(pattern, string)
            if (score === null) return
            if (matches[score] === undefined) {
                matches[score] = []
            }
            matches[score].push(onlyIndex ? index : this.data[index])
        })
        return matches
    }

}

module.exports = FuzzySearch
