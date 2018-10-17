const toAbsoluteUrl = require("to-absolute-url").default;
const Babel = require("@babel/standalone");

function requireWeb(path){
	if (requireWeb.verbose)
		console.log(`require( ${path} )`);

	const module = {
		exports : {},
		src : toAbsoluteUrl(path, 1),
	};

	if (requireWeb.verbose && path !== module.src)
		console.log(`${path} -> ${module.src}`);

	// check cache
	if (cache[module.src]){
		if (requireWeb.verbose)
			console.log(`${path}  found in cache`);

		return cache[module.src];
	}

	// send request
	const request = new XMLHttpRequest();
	request.open('GET', module.src, false);
	request.send(null);

	// check status
	if (request.status !== 200) {
		let error = new Error(`Error loading ${path}`, module.src);
		error.code = request.status;
		throw error;
	}

	// get content type
	const contentType = request.getResponseHeader("Content-Type");

	// JSON
	if (contentType === "application/json")
		module.exports = JSON.parse(request.responseText);

	// Javascript
	else {
		let js = Babel.transform(request.responseText, { presets: ['es2015'] }).code;

		let subRequire = path => requireWeb(new URL(path, module.src).href);
		setRequireProperties(subRequire, module.src);


		if (requireWeb.verbose)
			console.log(`Starting running ${path}`);

		new Function("exports", "require", "module", '__filename', '__dirname', js)
		(module.exports, subRequire, module, module.src);
	}

	// cache
	cache[module.src] = module.exports;

	// return module's exports
	return module.exports;
}

// cache
const cache = {};

// require static properties
function setRequireProperties(requireFunction, from){
	requireFunction.resolve = !from ? toAbsoluteUrl :  path => new URL(path, from).href;
	requireFunction.cache = !from ? cache : new Proxy(cache, {
		// resolve relative path to absolute url
		get : (cache, path) => cache[requireFunction.resolve(path)]
	});
}

// set properties on root require function
setRequireProperties(requireWeb);

// export
module.exports = requireWeb;
