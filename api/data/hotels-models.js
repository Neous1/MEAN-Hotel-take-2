//this model is what gets exported from this file rather that schema

var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },    
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var roomSchema = new mongoose.Schema({
    type: String,
    number: Number,
    description: String,
    photos: [String],
    price: Number
});
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
    currency: String,
    reviews: [reviewSchema],
    rooms: [roomSchema],
    location: {
        address: String,
        //always strore coordinate longitude (E/W), latitute (N/S) order
        coordinates: {
            type: [Number],
            index: "2dsphere" // to index coordinate on a sphere as opposed to a flat surface
        }
    }
});

mongoose.model("Hotel", hotelSchema, "hotels");
