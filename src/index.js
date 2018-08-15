const toAbsoluteUrl = require("to-absolute-url").default;

function requireWeb(path){
	const module = {
		exports : {},
		src : toAbsoluteUrl(path, 1),
	};

	// check cache
	if (cache[module.src])
		return cache[module.src];

	// send request
	const request = new XMLHttpRequest();
	request.open('GET', module.src, false);
	request.send(null);

	// check status
	if (request.status !== 200)
		throw request.status;

	// get content type
	const contentType = request.getResponseHeader("Content-Type");

	// JSON
	if (contentType === "application/json")
		module.exports = JSON.parse(request.responseText);

	// Javascript
	else {
		let js = request.responseText;
		new Function("exports", "require", "module", '__filename', '__dirname', js)
		(module.exports, path => requireWeb(new URL(path, module.src).href), module, module.src);
	}

	// cache
	cache[module.src] = module.exports;

	// return module's exports
	return module.exports;
}

// cache
const cache = requireWeb.cache = {};

module.exports = requireWeb;