function applyUserRoutes(app) {
    const User = require("../controllers/user.controller");
    app.post("/add-user", User.create);
    app.get("/get-user", User.getUser);
    app.put("/update-user", User.update);
    app.get("/owners_by_master_id", User.getOwnersByMasterId);
}

module.exports = {
    applyUserRoutes,
}