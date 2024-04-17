const assert = require('assert');

describe('LessPluginCleanCSS', function () {
    it('should work as less plugin', function () {
        const less = require('less');
        const LessPluginCleanCSS = require('..');

        const cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});

        const lessString = 'body { color: #f00; }';

        return less.render(lessString, { plugins: [cleanCSSPlugin] })
            .then(function (result) {
                assert(result.css === 'body{color:red}');
            });
    });
});
