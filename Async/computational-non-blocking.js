// another process of node is needed for multi threading
var child_process = require("child_process");

console.log(1);
//use spawn method to call child_process
var newProcess = child_process.spawn("node", ["_fibonacci.js"], {
    stdio: "inherit" // used to share main console with newProcess.
});
console.log(2);