function applyMasterRoutes(app) {
    const Master = require("../controllers/master.controller");
    app.get("/works", Master.getWorks);
    app.get("/sales", Master.getSales);
    app.get("/master", Master.getByMasterId);
    app.get("/own_ids", Master.getOwnedIds);
    app.get("/get_master_by_cid", Master.getMasterByCid);
    app.get("/search", Master.search);
    app.get("/latest", Master.getLatest);
}

module.exports = {
    applyMasterRoutes,
}