const https = require('https');
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require('path');
const Stream = require('stream').Transform;

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function saveMasterImages(arr, master_id) {
    const directory = `./blockchain/images/${master_id}/`;
    ensureDirectoryExistence(directory);
    arr.forEach((img_link, index) => {
        https.request(`https://ipfs.io/ipfs/${img_link}`, (response) => {
            let data = new Stream();
            response.on('data', (chunk) => data.push(chunk));
            response.on('end', function() {
                const filePath = `${directory}${index}.png`;
                ensureDirectoryExistence(filePath);
                fsPromises.writeFile(filePath, data.read())
                    .catch(console.error);
            });
        }).end();
    });
}

module.exports = {
    saveMasterImages
}