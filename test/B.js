log("Requiring D from B");

if (require.cache["./D.js"]) // will not be found because never loaded before, but this log will run in C.js
	log("D found in require.cache");

let D = require("./D.js");

if (D === true)
	log("D successfully imported");
else
	log("D was not imported properly");

module.exports = D;
