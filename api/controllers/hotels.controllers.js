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
    var maxCount = 10; //set maximum records returned

    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        //error trapping
        //status 200 ok
        //status 400 bad request
        //status 404 NOt found
        //status 500 internal error
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
    //use the Hotel model
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
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("103 . Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

//this function is used to split the string into array in the  create()
var _splitArray = function (input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};

module.exports.hotelsAddOne = function (req, res) {

    Hotel //create takes an object to be added to the database and a callback function
        .create({
            name: req.body.name,
            description: req.body.description,
            stars: parseInt(req.body.stars, 10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                address: req.body.address,
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            }

        }, function (err, hotel) {
            if (err) {
                console.log('Error creating hotel');
                res
                    .status(400)
                    .json(err);
            } else {
                console.log('Hotel created', hotel);
                res
                    .status(201)
                    .json(hotel);
            }
        });
};

module.exports.hotelsUpdateOne = function (req, res) {
    var hotelId = req.params.hotelId; //extract the url parameter and save it in a variable. which can be used to get a specific piece of data
    console.log("GET hotelId", hotelId);
    Hotel
        .findById(hotelId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("103 . Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name,
                    doc.description = req.body.description,
                    doc.stars = parseInt(req.body.stars, 10),
                    doc.services = _splitArray(req.body.services),
                    doc.photos = _splitArray(req.body.photos),
                    doc.currency = req.body.currency,
                    doc.location = {
                        address: req.body.address,
                        coordinates: [
                            parseFloat(req.body.lng),
                            parseFloat(req.body.lat)
                        ]
                    };
                doc.save(function (err, hotelsUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};