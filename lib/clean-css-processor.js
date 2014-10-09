var CleanCSS = require('clean-css'),
    usage = require("./usage");

module.exports = function(less) {
    function CleanCSSProcessor(options) {
        this.options = this.interpretOptions(options);
    };

    CleanCSSProcessor.prototype = {
        process: function (css) {
            var options = this.options || {};

            if (options.keepSpecialComments === undefined) {
                options.keepSpecialComments = "*";
            }
            options.processImport = false;
            options.noRebase = true;
            if (options.noAdvanced === undefined) {
                options.noAdvanced = true;
            }

            return new CleanCSS(options).minify(css);
        },
        interpretOptions: function(options) {
            if (typeof options === 'string') {
                var cleanOptionArgs = options.split(" ");
                options = {};
                for(var i = 0; i < cleanOptionArgs.length; i++) {
                    var argSplit = cleanOptionArgs[i].split("="),
                        argName = argSplit[0].replace(/^-+/,"");
                    switch(argName) {
                        case "keep-line-breaks":
                        case "b":
                            options.keepBreaks = true;
                            break;
                        case "s0":
                            options.keepSpecialComments = 0;
                            break;
                        case "s1":
                            options.keepSpecialComments = 1;
                            break;
                        // for compatibility - does nothing
                        case "skip-advanced":
                            options.noAdvanced = true;
                            break;
                        case "advanced":
                            options.noAdvanced = false;
                            break;
                        case "compatibility":
                            options.compatibility = argSplit[1];
                            break;
                        case "rounding-precision":
                            options.roundingPrecision = Number(argSplit[1]);
                            break;
                        default:
                            console.log("unrecognised clean-css option '" + argSplit[0] + "'");
                            usage.printOptions();
                            throw new Error();
                    }
                }
            }
            return options;
        }
    };

    return CleanCSSProcessor;
};
