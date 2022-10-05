const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    address: String,
    name: String,
    picture: String,
    verified: Boolean,
    first_visit: Date,
    last_visit: Date,
    author: [String],
    owns: [String],
    socials: [String],
    other: [String],
});

module.exports = mongoose.model("User", userSchema);