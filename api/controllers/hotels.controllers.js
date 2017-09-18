var dbconn = require("../data/dbconnections");
var ObjectId = require("mongodb").ObjectId; // necessary bc objectid datatype is special to mongo and not supported json.

var hotelData = require("../data/hotel-data.json");

module.exports.hotelsGetAll = function (req, res) {

    var db = dbconn.get();
    var collection = db.collection("hotels");

    var offset = 0;
    var count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function (err, docs) {
            console.log("Fond hotels", docs);
            res
                .status(200)
                .json(docs)
        });


};

module.exports.hotelsGetOne = function (req, res) {
    var db = dbconn.get();
    var collection = db.collection("hotels");

    var hotelId = req.params.hotelId; //extract the url parameter and save it in a variable. which can be used to get a specific piece of data
    console.log("GET hotelId", hotelId);
    collection
        .findOne({
            _id: ObjectId(hotelId)
        }, function (err, doc) {
            res
                .status(200)
                .json(doc);
        })
};

module.exports.hotelsAddOne = function (req, res) {

    var db = dbconn.get();
    var collection = db.collection("hotels");
    var newHotel;

    console.log("POST new hotel");

    if(req.body && req.body.name && req.body.stars){
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
     
    collection.insertOne(newHotel, function(err, response){
        console.log(newHotel)
        res
        .status(201)
        .json(response);  
    })
    }else{
        console.log("Data missing from body");
        res
            .status(400)
            .json({message : "Required data missing from body"});
    }
}