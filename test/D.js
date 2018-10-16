log("Requiring E from D");
let E = require("./E.js");

if (E === true)
	log("E successfully imported");
else
	log("E was not imported properly");

module.exports = E;
