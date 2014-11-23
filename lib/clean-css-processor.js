var CleanCSS = require('clean-css'),
    usage = require("./usage");

module.exports = function(less) {
    function CleanCSSProcessor(options) {
        this.options = options || {};
    };

    CleanCSSProcessor.prototype = {
        process: function (css, extra) {
            var options = this.options,
                sourceMap = extra.sourceMap;

            if (sourceMap) {
                options.sourceMap = sourceMap.getExternalSourceMap();
                console.log(options.sourceMap);
            }

            if (options.keepSpecialComments === undefined) {
                options.keepSpecialComments = "*";
            }
            options.processImport = false;
            options.noRebase = true;
            if (options.noAdvanced === undefined) {
                options.noAdvanced = true;
            }

            var output = new CleanCSS(options).minify(css);

            if (sourceMap) {
                sourceMap.setExternalSourceMap(JSON.stringify(output.sourceMap));
            }

            var css = output.styles;
            if (sourceMap) {
                var sourceMapURL = sourceMap.getSourceMapURL();
                if (sourceMap.getCSSAppendage) {
                    css += sourceMap.getCSSAppendage();
                } else {
                    // TODO remove once latest version of less.js (>2.1.0) is released
                    if (sourceMap.isInline()) {
                        sourceMapURL = "data:application/json;base64," + new Buffer(output.sourceMap).toString('base64');
                    }
                    css += "/*# sourceMappingURL=" + sourceMapURL + " */";
                }
            }

            return css;
        }
    };

    return CleanCSSProcessor;
};
