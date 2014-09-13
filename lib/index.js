var getCleanCSSProcessor = require("./clean-css-processor");

module.exports = {
    install: function(less, pluginManager, options) {
        var CleanCSSProcessor = getCleanCSSProcessor(less);
        pluginManager.addPostProcessor(new CleanCSSProcessor(options));
    }
};
