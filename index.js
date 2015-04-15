var fs = require('fs');
var path = require('path');
var join = path.join;

function Plugin(files) {
  this.context = path.dirname(module.parent.filename);

  // allows for a single string entry
  if (typeof files == 'string' || files instanceof String){
    this.files = [files];
  } else {
    this.files = files || [];
  }

}

// hook into webpack
Plugin.prototype.apply = function(compiler) {
  var self = this;
  return compiler.plugin('done', function() {
    self.files.forEach(function(file){
      var file = join(self.context, file);
      var json = self.increment(file);
      fs.writeFile(file, JSON.stringify(json, null, 2));
    });
  });
}

// increment build number
Plugin.prototype.increment = function(file) {
  var json = require(file);
  var versions = json.version.split('.');
  versions[2] = parseInt(versions[2]) + 1;
  json.version = versions.join('.');
  return json;
}

module.exports = Plugin;
