# A sync `require()` function for browser.

This script place a `window.require()` function which allow to to load and run js modules synchronously.

##### Run:
````
<script src="require.web.js"></script>
// or
import "require.web.js"
````


##### Use:
````
let myModule = require("./myModule.js");
let Algolia = window.require("https://cdn.jsdelivr.net/npm/algoliasearch@3.30.0/dist/algoliasearch.min.js");
let StackTrace = window.require("https://cdn.jsdelivr.net/npm/stacktrace-js@2.0.0/dist/stacktrace.min.js");
````

##### Warning
Since the function is for browser only, you must specify the relative/absolute path to the module's file you wish to load.
You can't load modules from `node_modules` folder with only module's name like Node does.
Because it doesn't know the architecture of your files & folders to know where your modules' files are. It's web dude.

##### Missing:
- Debug imported module in debugger.
- Import ES6 modules.
