var express = require("express");
var app = express();

app.set("port", 3000);

app.listen(app.get("port"));
console.log("Live on port "+app.get("port"));
