var express = require("express");
var app = express();

app.set("port", 3000);

app.get("/", function(req, res){
    console.log("Get the homepage");
    res
    .status(404)
    .send("Response sent to sever")
});
app.get("/json", function(req, res){
    console.log("Get the json");
    res
    .status(202)
    .json({"jsonData": true});
});

var server = app.listen(app.get("port"), function(){
    var port = server.address().port; // extract port number from port object
  console.log("Live on port " + port);
});
