const assert = require("assert");
const fs = require("fs");
const {dialog} = require('electron').remote;
const path = require('path');

const numberRegex = /\d+/gm;
export default {
    async loadFiles() {
        const result = await dialog.showOpenDialog({
            properties: ["openFile", "multiSelections"],
            filters: [
                {name: "Video", extensions: ["mkv", "avi", "mp4", "mpg", "mpeg"]},
                {name: "All Files", extensions: ["*"]}
            ]
        });

        let files = [];
        if (result.filePaths.length > 0) {
            files = result.filePaths.map(it => {
                const extension = path.extname(it);
                return {
                    "name": path.basename(it, extension),
                    "path": it
                }
            })
        }

        return this.sortFiles(files)
    },
    sortFiles(files) {
        for (let i = 0; i < files.length; i++) {
            let weight = 0;
            let match;
            while ((match = numberRegex.exec(files[i].path)) !== null) {
                weight += parseInt(match[0])
            }
            files[i].weight = weight
        }

        return _.sortBy(files, ["weight"])
    },

    async renameFiles(files, names) {

        let promises = [];
        for (let i = 0; i < Math.min(files.length, names.length); i++) {
            const oldPath = files[i].path;
            const basedir = path.dirname(oldPath);
            const extension = path.extname(oldPath);
            const newPath = path.join(basedir, names[i] + extension);

            promises.push(
                new Promise((resolve, reject) => {
                    fs.rename(oldPath, newPath, function (err) {
                        if (err === null) {
                            resolve({
                                name: path.basename(newPath, extension),
                                path: newPath
                            })
                        } else {
                            reject(err);
                        }
                    })
                })
            )
        }

        return await Promise.all(promises)
    }
}
