const assert = require("assert");
const fs = require("fs");
const {dialog} = require('electron').remote;
const path = require('path');

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
                    "path": it,
                    "extension": extension
                }
            })
        }
        return files
    }
}
