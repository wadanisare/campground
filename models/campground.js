const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompgroundSchema = new Schema({
    title: String,
    Image: String,
    price: Number,
    description: String,
    location: String,
})

//Now export your model
module.exports = mongoose.model("Campground", CompgroundSchema);