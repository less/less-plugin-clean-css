module.exports = {
    printUsage: function() {
        console.log("");
        console.log("Clean CSS Plugin");
        console.log("specify plugin with --clean-css");
        console.log("To pass an option to clean css, use the same CLI arguments as from https://github.com/GoalSmashers/clean-css e.g.");
        console.log("--clean-css=\"-s1 --advanced\"");
        console.log("The options do not require dashes, so this is also equivalent");
        console.log("--clean-css=\"s1 advanced\"");
        this.printOptions();
        console.log("");
    },
    printOptions: function() {
        console.log("we support only arguments that make sense for less, 'keep-line-breaks', 'b'");
        console.log("'s0', 's1', 'advanced', 'skip-advanced', 'compatibility', 'rounding-precision'");
    }
};
