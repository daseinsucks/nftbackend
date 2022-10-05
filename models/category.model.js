const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriesSchema = new Schema({
    id: Number,
    name: String,
    img_link: String,
});

module.exports = mongoose.model("Category", categoriesSchema);