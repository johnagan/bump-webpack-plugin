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

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
