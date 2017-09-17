var express = require("express");
var app = express();

app.set("port", 3000);

//app.listen returns an object that can be used to extract port number
var server = app.listen(app.get("port"), function(){
    var port = server.address().port; // extract port number from port object
  console.log("Live on port " + port);
});
