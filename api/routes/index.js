var express = require("express");
var router = express.Router();

var ctrlHotels = require("../controllers/hotels.controllers");
var ctrlReviews = require("../controllers/reviews.controllers");

//define the router, the route adn the function you want to run
router
    .route("/hotels")
    .get(ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);

//create a route to get 1 hotel
router
    .route("/hotels/:hotelId")
    .get(ctrlHotels.hotelsGetOne);

//Review routes
router
    .route("/hotels/:hotelId/reviews")
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne);

//create a route to get 1 hotel
router
    .route("/hotels/:hotelId/reviews/:reviewId")
    .get(ctrlReviews.reviewsGetOne);



module.exports = router;