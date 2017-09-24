var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

//GET all review for a hotel by getting a hotel, 
module.exports.reviewsGetAll = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, doc) {
            console.log("Returned doc ", doc)
            res
                .status(200)
                .json(doc.reviews); //displays the reviews from the whole query
        });
};

module.exports.reviewsGetOne = function (req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('Get reviewId: ' + reviewId + "for hotelId" + hotelId);

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, hotel) {
            console.log("Returned hotel ", hotel)
            var review = hotel.reviews.id(reviewId); // that will extract the review we're after via the id() from mongoose
            res
                .status(200)
                .json(review); //displays the reviews 
        });
};

//this function pushes data in the review array
var _addReview = function (req, res, hotel) {
    //push review in reviews Array in the model instance 
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });
    //use mongoose save() to save a the parent document in order to save a subdocument
    hotel.save(function (err, hotelUpdated) {
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);//this will return the last review added to the reviews Array
        }
    });
};


module.exports.reviewsAddOne = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);

    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, doc) { 
            var response = {
                status: 200,
                message: []
            };
            if (err) {
                console.log('Error find hotel');
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log('Hotel id not found in database', id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found" + id
                };
            }
            if (doc) {
                _addReview(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
        });
};