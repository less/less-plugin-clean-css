var getCleanCSSProcessor = require("./clean-css-processor"),
    usage = require("./usage");

module.exports = {
    install: function(less, pluginManager, options) {
        var CleanCSSProcessor = getCleanCSSProcessor(less);
        pluginManager.addPostProcessor(new CleanCSSProcessor(options));
    },
    printUsage: function () {
        usage.printUsage();
    },
    minVersion: [2, 0, 0]
};
