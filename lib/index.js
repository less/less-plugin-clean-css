var getCleanCSSProcessor = require("./clean-css-processor"),
    usage = require("./usage"),
    parseOptions = require("./parse-options");

module.exports = {
    install: function(less, pluginManager) {
        var CleanCSSProcessor = getCleanCSSProcessor(less);
        pluginManager.addPostProcessor(new CleanCSSProcessor(this.options));
    },
    printUsage: function () {
        usage.printUsage();
    },
    setOptions: function(options) {
        this.options = parseOptions(options);
    },
    minVersion: [2, 0, 0]
};
