const Path = require('path');
const path = Path.resolve(__dirname, 'dist');
const EditableSourcesWebpackPlugin = require('editable-sources-webpack-plugin');

module.exports = [
	// global
	{
		entry: "./src/index.js",
		output: {
			filename: "require-global.web.js",
			path,
			library: 'require',
			libraryTarget : "window",
		}
	},

	// es-6 module
	{
		entry: "./src/index.js",
		output: {
			filename: "require-module.web.js",
			path,
			library: 'x',
			libraryTarget : "window",
		},

		plugins : [
			// export default the compiled module
			new EditableSourcesWebpackPlugin(
				/^require-module\.web\.js$/,
				sourceCode => ("export default " + sourceCode.slice('window["x"] ='.length)),
			)
		],

		// disable uglify until it can target ES6
		optimization: {
			minimizer: []
		},
	}
];