// a json file need only be required to be available unlike a text file
var hotelData = require("../data/hotel-data.json");

module.exports.hotelsGetAll = function(req, res){
    console.log("GET the hotels")
    res
        .status(200)
        .json(hotelData);
};

module.exports.hotelsGetOne = function(req, res){
    var hotelId = req.params.hotelId; //extract the url parameter and save it in a variable. which can be used to get a specific piece of data
    var thisHotel = hotelData[hotelId];//hotelId is being used as a location index on the hotel-data array 
    console.log("GET hotelId", hotelId);
    res
        .status(200)
        .json(thisHotel);
};