var express = require("express");
var app = express();
var path = require("path");

var routes = require("./api/routes");


app.set("port", 3000);

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);


var server = app.listen(app.get("port"), function () {
    var port = server.address().port; // extract port number from port object
    console.log("Live on port " + port);
});