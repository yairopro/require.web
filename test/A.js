// importing B
log("Requiring B from A");
let B = require("./B.js").default;

if (B === true)
	log("B successfully imported");
else
	log("B was not imported properly");


// importing C
log("Requiring C from A");
let C = require("./C.js");

if (C === true)
	log("C successfully imported");
else
	log("C was not imported properly");

module.exports = B && C;
