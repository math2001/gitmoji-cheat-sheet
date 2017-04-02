"use strict";

const zipFolder = require("zip-folder")
const fs = require('fs')

function zipDists(dists) {
    dists.some((dist) => {
        zipFolder(dist, `${dist}.zip`, err => {
            if (err) {
                console.error(`An error occured while zipping ${dist} `)
            }
            console.info(`Successfully zipped ${dist} → ${dist}.zip`)
        })
    })
}

fs.readdir('./dist', (err, folders) => {
    if (err) {
        console.error("An error occured while reading the 'dist' folder.", err)
        return
    }
    zipDists(folders.map(folder => `./dist/${folder}`).filter(folder => fs.lstatSync(folder).isDirectory()))
})
