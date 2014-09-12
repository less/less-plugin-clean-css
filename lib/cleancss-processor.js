module.exports = function(less) {
    function CleanCSSProcessor(options) {
        this.options = options;
    };

    CleanCSSProcessor.prototype = {
        process: function (css) {
            var CleanCSS = require('clean-css');
            var cleancssOptions = this.options || {};

            if (cleancssOptions.keepSpecialComments === undefined) {
                cleancssOptions.keepSpecialComments = "*";
            }
            cleancssOptions.processImport = false;
            cleancssOptions.noRebase = true;
            if (cleancssOptions.noAdvanced === undefined) {
                cleancssOptions.noAdvanced = true;
            }

            return new CleanCSS(cleancssOptions).minify(css);
        }
    };
    return CleanCSSProcessor;
};
