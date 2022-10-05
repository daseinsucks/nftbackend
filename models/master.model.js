const mongoose = require("mongoose");
const { Schema } = mongoose;

const masterSchema = new Schema({
    master_id: String,
    title: String,
    categories: [Number],
    description: String,
    external: String,
    author: String,
    link: String,
    price: String,
    currency: Number,
    amount: Number,
    total: Number,
    bids: [Object],
    thumbnail: String,
    transferred_at: [Object],
    created_at: Date,
});

module.exports = mongoose.model("Master", masterSchema);