//this model is what gets exported from this file rather that schema
var mongoose = require("mongoose");

var hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, //name is a path and string is a schema type
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    services: [String],
    description: String,
    photos: [String],
    currency: String
});