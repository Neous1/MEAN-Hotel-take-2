var dbconn = require("../data/dbconnections");

// a json file need only be required to be available unlike a text file
var hotelData = require("../data/hotel-data.json");

module.exports.hotelsGetAll = function (req, res) {

    var db = dbconn.get();
    var collection = db.collection("hotels");

    var docs = collection.find();
    
    console.log("db", db);

    console.log("GET the hotels")
    console.log(req.query);

    var offset = 0;
    var count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    //slice is used to determine the starting and ending point of amount of data being displayed/served
    var returnData = hotelData.slice(offset, offset + count)
    res
        .status(200)
        .json(returnData);
};

module.exports.hotelsGetOne = function (req, res) {
    var hotelId = req.params.hotelId; //extract the url parameter and save it in a variable. which can be used to get a specific piece of data
    var thisHotel = hotelData[hotelId]; //hotelId is being used as a location index on the hotel-data array 
    console.log("GET hotelId", hotelId);
    res
        .status(200)
        .json(thisHotel);
};

module.exports.hotelsAddOne = function (req, res) {
    console.log("POST new hotel");
    console.log(req.body) //this is where body-parser will pull the data retrieve
    res
        .status(200)
        .json(req.body)
}