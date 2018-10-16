
try {
	log("Requiring A.js");
	let A = require("./A.js");

	if (A === true)
		log("A successfully imported");
	else
		log("A was not imported properly");
} catch (error) {
	log("An error happened. See console for more informations.");
	console.log(error);
}
