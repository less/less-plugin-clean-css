var CleanCSS = require('clean-css'),
    usage = require("./usage");

module.exports = function(less) {
    function CleanCSSProcessor(options) {
        this.options = options || {};
    };

    CleanCSSProcessor.prototype = {
        process: function (css, extra) {
            var options = this.options,
                sourceMap = extra.sourceMap,
                sources,
                sourcesContent;

            if (sourceMap) {
                options.sourceMap = sourceMap.getExternalSourceMap();
                if (options.sourceMap) {
                    var sourceMapObj = JSON.parse(options.sourceMap);
                    if (sourceMapObj.sourcesContent) {
                        sourcesContent = sourceMapObj.sourcesContent;
                        sources = sourceMapObj.sources;
                    }
                }
            }

            if (options.keepSpecialComments === undefined) {
                options.keepSpecialComments = "*";
            }
            options.processImport = false;

            if (options.rebase === undefined) {
                options.rebase = false;
            }

            if (options.advanced === undefined) {
                options.advanced = false;
            }

            var output = new CleanCSS(options).minify(css);

            if (sourceMap) {
                if (sourcesContent) {
                    for(var source = 0; source < sources.length; source++)
                    {
                        output.sourceMap.setSourceContent(sources[source], sourcesContent[source]);
                    }
                }
                sourceMap.setExternalSourceMap(JSON.stringify(output.sourceMap));
            }

            var css = output.styles;
            if (sourceMap) {
                var sourceMapURL = sourceMap.getSourceMapURL();
                css += sourceMap.getCSSAppendage();
            }

            return css;
        }
    };

    return CleanCSSProcessor;
};
