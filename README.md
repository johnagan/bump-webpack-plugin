# Bump for webpack
A webpack plugin to bump the patch number every build

## Usage

``` javascript
var Bump = require("bump-webpack-plugin");
module.exports = {
	plugins: [
		new Bump([
			'package.json',
			'bower.json'
		])
	]
}
```

Alternatively:

``` javascript
var Bump = require("bump-webpack-plugin");
var doPreBump = true;
module.exports = {
	plugins: [
		new Bump([
			'package.json',
			'bower.json'
		], doPreBump)
	]
}
```

If the doPreBump parameter is included and set to true, the version number is bumped before the compile
stage and hence before the actual bundling takes place. If the package.json file is included in the
bundle, for instance because you want to display the current version number in the program, the file 
with the bumped version id will be in the bundle.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
