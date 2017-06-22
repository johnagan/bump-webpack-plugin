var fs = require('fs');
var path = require('path');
var join = path.join;

function Plugin(files, doPreBump) {
  this.context = path.dirname(module.parent.filename);

  // allows for a single string entry
  if (typeof files == 'string' || files instanceof String){
    this.files = [files];
  } else {
    this.files = files || [];
  }
  this.preBump = doPreBump === true;
}

// hook into webpack
Plugin.prototype.apply = function(compiler) {
  var self = this;
  var compilerStage = this.preBump ? 'compile' : 'done';
  console.log('++++++++++++++++++++++++++++++++++ compilerStage=', compilerStage);
  return compiler.plugin(compilerStage, function() {
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
