var getCleanCSSProcessor = require("./cleancss-processor");

module.exports = {
    install: function(less, pluginManager, options) {
        var CleanCSSProcessor = getCleanCSSProcessor(less);
        pluginManager.addPostProcessor(new CleanCSSProcessor(options));
    }
};
