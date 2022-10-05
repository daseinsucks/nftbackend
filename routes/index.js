const {applyUserRoutes} = require("./user");
const {applyMasterRoutes} = require("./master");
const {applyCategoriesRoutes} = require("./categories");
const {applyUtilsRoutes} = require("./utils");

module.exports = (app) => {
    applyUserRoutes(app);
    applyMasterRoutes(app);
    applyCategoriesRoutes(app);
    applyUtilsRoutes(app);
};