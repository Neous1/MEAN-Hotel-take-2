var MongoClient = require("mongodb").MongoClient;

//protocol/server:port/dbname
var dburl = "mongodb://localhost:27017/meanhotel";

var _connection = null;

var open = function(){
    MongoClient.connect(dburl, function(){

    });
};

var get = function(){
    return _connection;
};

module.exports= {
    open:open,
    get:get
};

