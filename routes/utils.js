const {isUndefined} = require("../utils/types");
const fs = require("fs");
const fsPromises = require("fs/promises");

function applyUtilsRoutes(app) {
    app.get("/images", (req, res) => {
        const { master_id, id } = req.query;
        if (isUndefined(master_id) || isUndefined(id)) {
            res.send(null);
        }
        const filePath = `./blockchain/images/${master_id}/${id}.png`;
        fsPromises.access(filePath)
            .then(() => {
                fs.readFile(filePath,
                    (err, content) => {
                        res.writeHead(200, {
                            "Content-Type": "image/png" });
                        res.end(content);
                    });
            })
            .catch(console.error);

    });
}

module.exports = {
    applyUtilsRoutes,
}