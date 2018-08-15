const Path = require('path');
const path = Path.resolve(__dirname, 'dist');

module.exports = {
	entry: "./src/global.js",
	output: {
		filename: "require-global.web.js",
		path,
	},
};