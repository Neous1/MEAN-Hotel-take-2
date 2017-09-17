var express = require("express");

var router = express.Router();
//define the router, the route adn the function you want to run
router
    .route("/json")
    .get(function (req, res) {
        console.log("GET the json")
        res
            .status(200)
            .json({
                "jsonDatat": true
            });
    })
    .post(function (req, res) {
        console.log("POST the json route")
        res
            .status(200)
            .json({
                "jsonDatat": "POST received"
            });
    });
module.exports = router;
