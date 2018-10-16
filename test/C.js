log("Requiring D from C");

if (require.cache["./D.js"]) // will be found because already loaded from B.js
	log("D found in require.cache");

let D = require("./D.js");

if (D === true)
	log("D successfully imported");
else
	log("D was not imported properly");

module.exports = D;
