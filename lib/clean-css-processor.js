"use strict";

const CleanCSS = require("clean-css");

module.exports = function () {
    function CleanCSSProcessor(options) {
        this.options = options || {};
    }

    CleanCSSProcessor.prototype = {
        process: function (css, extra) {
            let options = this.options,
                sourceMap = extra.sourceMap,
                sources,
                sourcesContent;

            if (sourceMap) {
                options.sourceMap = sourceMap.getExternalSourceMap();
                if (options.sourceMap) {
                    options.sourceMap = options.sourceMap.toString();
                    const sourceMapObj = JSON.parse(options.sourceMap);
                    if (sourceMapObj.sourcesContent) {
                        sourcesContent = sourceMapObj.sourcesContent;
                        sources = sourceMapObj.sources;
                    }
                }
            }

            if (typeof options.keepSpecialComments === "undefined") {
                options.keepSpecialComments = "*";
            }
            options.processImport = false;

            if (typeof options.rebase === "undefined") {
                options.rebase = false;
            }

            if (typeof options.advanced === "undefined") {
                options.advanced = false;
            }

            const output = new CleanCSS(options).minify(css);

            if (sourceMap) {
                if (sourcesContent) {
                    for (let source = 0; source < sources.length; source++) {
                        output.sourceMap.setSourceContent(sources[source], sourcesContent[source]);
                    }
                }
                sourceMap.setExternalSourceMap(JSON.stringify(output.sourceMap));
            }

            let outputCSS = output.styles;
            if (sourceMap) {
                const sourceMapURL = sourceMap.getSourceMapURL();
                outputCSS += sourceMap.getCSSAppendage();
            }

            return outputCSS;
        }
    };

    return CleanCSSProcessor;
};
