var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

//GET all review for a hotel by getting a hotel, 
module.exports.reviewsGetAll = function(req, res){
    var hotelId = req.params.hotelId; 
    console.log("GET hotelId", hotelId);
    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (err, doc) {
            console.log("Returned doc ", doc)
            res
                .status(200)
                .json(doc.reviews);//displays the reviews from the whole query
        });
};

 module.exports.reviewsGetOne = function(req, res){
    var hotelId = req.params.hotelId; 
    var reviewId = req.params.reviewId; 
    console.log('Get reviewId: '+ reviewId + "for hotelId"+ hotelId);

    Hotel
    .findById(hotelId)
    .select("reviews")
    .exec(function (err, hotel) {
        console.log("Returned hotel ", hotel)
        res
            .status(200)
            .json(hotel.reviews);//displays the reviews from the whole query
    });
 };