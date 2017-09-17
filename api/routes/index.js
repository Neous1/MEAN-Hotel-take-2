var express = require("express");
var router = express.Router();

var ctrHotels = require("../controllers/hotels.controllers");

//define the router, the route adn the function you want to run
router
    .route("/hotels")
    .get(ctrHotels.hotelsGetAll);

module.exports = router;
