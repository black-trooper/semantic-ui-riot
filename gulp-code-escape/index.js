var
  map = require('map-stream'),
  PluginError = require('gulp-util').PluginError;

/**
 *
 * @param {!vinyl.File} file
 * @param {!object.<string, string>} options
 * @param {!function(PluginError, Buffer)} callback
**/
function escapeFile(file, options, callback) {
  var contents = file.contents.toString()
  var beginTag = '<code class="prettyprint">';
  var endTag = '</code>';

  var array = contents.split(beginTag);
  var content = array.map((element, index) => {
    if (index === 0) return element;
    var split = element.split(endTag);
    return escapeCode(split[0]) + endTag + split[1]
  }).join(beginTag)

  callback(null, new Buffer(content));
}

function escapeCode(code) {
  code = escape(code)
  var minLength = -1
  code.split("\n").forEach(element => {
    if (ltrim(element).length === 0) {
      return;
    }
    var length = element.length - ltrim(element).length;
    if (minLength === -1 || minLength > length) {
      minLength = length;
    }
  });
  return code.split("\n").filter((element, index) => {
    return !(index === 0 && ltrim(element).length === 0);
  }).map(element => {
    return element.substring(minLength)
  }).join("\n");
}

function ltrim(target) {
  return target.replace(/^\s+/, "");
}

function escape(str) {
  if (str == null) {
    return str;
  }
  if (typeof str !== "string") {
    str = String(str);
  }

  var hChars = /[&<>\"\'{}]/;
  if (hChars.test(String(str))) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\'/g, '&apos;')
      .replace(/\"/g, '&quot;')
      .replace(/{/g, '\\{')
      .replace(/}/g, '\\}');
  }
  else {
    return str;
  }
};

module.exports = function (options) {
  options = options || {};
  return map(function (file, callback) {
    escapeFile(file, options, function (err, buffer) {
      if (err) return callback(err);
      file.contents = buffer;
      callback(null, file);
    });
  });
};