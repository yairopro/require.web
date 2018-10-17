# A sync `require()` function for browser.

This `require()` function allow you to to load and run js modules, or json, synchronously.

##### Import:
````
// global using script tag
<script src="./dist/require-global.web.js"></script>

// ES6 module
import require from "./dist/require-module.web.js"

// or npm module in case you use webpack
const requireWeb = require("require.web");
````


##### Use:
````
// Using absolute url
let Stacktrace = require("https://cdn.jsdelivr.net/npm/stacktrace-js@2.0.0/dist/stacktrace.min.js");

// Using relative path (doesn't work in console)
let myModule = require("./myModule.js");
````
Other uses:
````
// Verbose mode will log imported paths
require.verbose = true;

// Resolve relative path to absolute url. Doesn't work in console.
require.resolve("./myModule.js"); // https://domain.com/path/to/myModule.js
````

##### Test:
Open `test/index.html` in your browser to test. Here's its [require graph](https://docs.google.com/drawings/d/19vAvPz4lwgHiKK0g0oBHK8KIdpQTPxLvw8akm39LUFI/edit?usp=sharing).

##### Warning
Since the function is for browser only, you must specify the relative/absolute path to the module's file you wish to load.
You can't load modules from `node_modules` folder with only module's name like Node does.
Because it doesn't know the architecture of your files & folders to know where your modules' files are. It's web dude.

##### Features:
- [x] Import ES6 modules.
- [ ] Debug required module in debugger.
