function applyCategoriesRoutes(app) {
    const Categories = require("../controllers/category.controller");
    app.get("/categories", Categories.getCategories);
}

module.exports = {
    applyCategoriesRoutes,
}