module.exports = {
    default: {
        require: ["features/steps/*.ts"],
        requireModule: ["ts-node/register"],
        format: [
            "progress-bar",
            "json:reports/cucumber-report.json"  // Generates a JSON report
        ],
        parallel: 1,
        publishQuiet: false
    }
};
