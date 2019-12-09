var assert = require('assert');

describe('LessPluginCleanCSS', function () {
  it('should work as less plugin', function () {
    var less = require('less');
    var LessPluginCleanCSS = require('..');

    var cleanCSSPlugin = new LessPluginCleanCSS({ advanced: true });

    var lessString = 'body { color: #f00; }';

    return less.render(lessString, { plugins: [cleanCSSPlugin] })
      .then(function (result) {
        assert(result.css === 'body{color:red}');
      });
  });
});
