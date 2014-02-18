// An example configuration file.
exports.config = {
    // The address of a running selenium server.
//    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:9000',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['./e2e/**/*Spec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};