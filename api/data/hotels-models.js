//this model is what gets exported from this file rather that schema
var mongoose = require("mongoose");

var hotelSchema = new mongoose.Schema({
    name: String, //name is a path and string is a schema type
    stars: Number,
    services: [String],
    description: String,
    photos: [String],
    currency: String
})