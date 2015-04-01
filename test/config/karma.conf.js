// Karma configuration
module.exports = function (config) {
    "use strict";

    var configuration = {
        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
          /** tagstart */
          "./dist/assets/libs/normalize.css/normalize.css",
          "./dist/assets/libs/angular/angular.js",
          "./dist/assets/libs/angular-resource/angular-resource.js",
          "./dist/assets/libs/angular-ui-router/release/angular-ui-router.js",
          "./dist/assets/libs/angular-recaptcha/release/angular-recaptcha.js",
          "./dist/assets/libs/angular-input-date/src/angular-input-date.js",
          "./dist/assets/libs/ace-builds/src-min-noconflict/ace.js",
          "./dist/assets/libs/angular-ui-ace/ui-ace.js",
          "./dist/assets/libs/pdfjs-bower/dist/compatibility.js",
          "./dist/assets/libs/pdfjs-bower/dist/pdf.js",
          "./dist/assets/js/BlueLatex.js",
          "./dist/assets/js/templates.js",
          "./dist/assets/js/BlueLatex-components.js",
          "./dist/assets/js/BlueLatex-core.js",
          "./dist/assets/js/BlueLatex-shared.js",
          /** tagend */
          "./dist/assets/libs/angular-mocks/angular-mocks.js",
          'test/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 9371,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        reporters: ['progress'],

        colors: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true

    };
    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }
    config.set(configuration);
};
