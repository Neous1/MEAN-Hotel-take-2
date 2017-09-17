var express = require("express");
var app = express();

app.set("port", 3000);

app.get("/", function(req, res){
    console.log("Get the homepage");
    res.send("Response sent to sever")
});

var server = app.listen(app.get("port"), function(){
    var port = server.address().port; // extract port number from port object
  console.log("Live on port " + port);
});
