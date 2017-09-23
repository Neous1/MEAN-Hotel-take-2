var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

var runGeoQuery = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    //A geoJSON point
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true, // the earth is not flat
        maxDistance: 2000, //liit the distance of hte search , distance from measured in meters 
        num: 5 // specify the number of records returned
    };
    //use geoNear () to query the Hotel model . GeoNear () Returns documents in order of proximity to a specified point, from the nearest to farthest. geoNear requires a geospatial index.
    Hotel
        .geoNear(point, geoOptions, function (err, results, stats) {

            console.log("Geo resutl", results);
            console.log("Geo stats", stats);
            res
                .status(200)
                .json(results);
        });


};

module.exports.hotelsGetAll = function (req, res) {


    var offset = 0;
    var count = 5;
    var maxCount = 10;//set maximum records returned

    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    //trap error
    if (isNaN(offset) || isNaN(count)) {
        //always return a response
        res
            .status(400) //bad request
            .json({
                "message": "If supplied in querystring count and offset should a number"
            })
        return;
    }
    //check for number of records being returned
    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message": "Count limit of " + maxCount + " exceeded"
            });
    }
    //user the Hotel model
    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, hotels) {
            if (err) {
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found Hotels", hotels.length);
                res
                    .json(hotels);

            };
        })
};

module.exports.hotelsGetOne = function (req, res) {


    var hotelId = req.params.hotelId; //extract the url parameter and save it in a variable. which can be used to get a specific piece of data
    console.log("GET hotelId", hotelId);
    Hotel
        .findById(hotelId)
        .exec(function (err, doc) {
            res
                .status(200)
                .json(doc);
        });
};

module.exports.hotelsAddOne = function (req, res) {

    var db = dbconn.get();
    var collection = db.collection("hotels");
    var newHotel;

    console.log("POST new hotel");

    if (req.body && req.body.name && req.body.stars) {
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);

        collection.insertOne(newHotel, function (err, response) {
            console.log(response);
            console.log(response.ops);
            res
                .status(201)
                .json(response.ops);
        })
    } else {
        console.log("Data missing from body");
        res
            .status(400)
            .json({
                message: "Required data missing from body"
            });
    }
}