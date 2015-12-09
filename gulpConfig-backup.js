module.exports = function () {

    var environments = require('./devLib/utils/environments');

    var _destinationDir = './client/ui/';
    var _isRelease = false;
    var _isDebug = false;
    var _isTesting = false;

    if (environments.development()) {
        _isDebug = true;
        _isRelease = !_isDebug;
        _isTesting = false;
    }
    if (environments.production()) {
        _isDebug = false;
        _isRelease = !_isDebug;
        _isTesting = false;
    }
    if (environments.testing()) {
        _isTesting = true;
        _isDebug = false;
        _isRelease = false;
    }

    function jsDeploymentLibs(dir) {
        if (dir == undefined) {
            dir = _destinationDir;
        }

        return [
            dir + 'lib/angular/jquery.min.js',
            dir + 'lib/angular/angular.min.js',
            dir + 'lib/angular/angular-route.min.js',
            dir + 'lib/angular/angular-resource.min.js',
            dir + 'lib/angular/angular-sanitize.min.js',
            dir + 'lib/bootstrap/*.min.js',
            dir + 'lib/angular-ui/*.min.js',
            dir + 'lib/adal/*.min.js',
            dir + '**/*.js'
        ];
    }


    function getInjectFiles(destinationDir, isMinimizing, isTesting) {
        var appJs;

        var output = [
            destinationDir + 'lib/angular/jquery.min.js',
            destinationDir + 'lib/angular/angular.min.js',
            destinationDir + 'lib/angular/angular-route.min.js',
            destinationDir + 'lib/angular/angular-resource.min.js',
            destinationDir + 'lib/angular/angular-sanitize.min.js',
            destinationDir + 'lib/bootstrap/**/*.min.js',
            destinationDir + 'lib/angular-ui/ui-bootstrap-tpls-0.14.3.min.js',
            destinationDir + 'lib/angular-ui-router/angular-ui-router.js'
        ];
        var adalJs = [
            destinationDir + 'lib/adal/adal.js',
            destinationDir + 'lib/adal/adal-angular.js'
        ];


            appJs = [
                destinationDir + 'App/App.js',
                destinationDir + 'App/App.module.js',
                destinationDir + 'App/App.constants.js',
                destinationDir + 'App/App.ActiveDirectoryConfiguration.js',
                destinationDir + 'App/Common/*.js',
                destinationDir + 'App/Model/*.js',
                destinationDir + 'App/Validation/*.js',
                destinationDir + 'App/Feed/*.js',
                destinationDir + 'App/FeedItems/*.js',
                destinationDir + 'App/FeedItems/**/*.js',
                destinationDir + 'App/**/*.js',
                '!' + destinationDir + 'App/YFO_app.js'
            ];


        var testLibs = [
            destinationDir + 'lib/angular/angular-mocks.js',
            destinationDir + 'lib/jasmine/jasmine-fixture.min.js',
            destinationDir + 'lib/jasmine/jasmine-jquery.js',
            destinationDir + 'Tests/Mocks/**/*.js',
            destinationDir + 'Tests/App/**/*.js'
        ];

        output = output.concat(adalJs);

        output = output.concat(appJs);

        if (_isTesting || isTesting)
        {
            output = output.concat(testLibs);
        }

        return output;
    }

    var config = {
        destinationDir: _destinationDir,
        isRelease: _isRelease,
        isDebug: _isDebug,
        isTesting: _isTesting,

        jsDeploymentLibs: jsDeploymentLibs(_destinationDir),
        jsInjectLibs: getInjectFiles(_destinationDir),
        jsCompile: function (dir) {
            if (dir === undefined) {
                dir = "./";
            }
            return [
                dir + 'app/*.ts',
                dir + 'app/**/*.ts',
                dir + 'typings/**/*.ts'
            ];
        },

        appfilesDebug: [
            '!lib/YFO_app.js',
            '!lib/jasmine/*.*',
            '!lib/angular/angular-mocks.js',
            'lib/**/*.js',
            'lib/**/*.css',
            'app/*.js',
            'app/*.ts',
            'app/**/*.js',
            'app/**/*.ts',
            'app/**/*.map',
            'app/**/*.html',
            'app/**/*.css',
            'app/**/*.css',
            'Fonts/**/*.woff',
            'Fonts/**/*.woff2',
            'Fonts/**/*.ttf',
            'graphics/*.*',
            'graphics/**/*.*',
            'Web.config'
        ]
    };

    config.setDestinationDir = function (dir) {
        config.destinationDir = dir;
        config.jsDeploymentLibs = jsDeploymentLibs(dir);
        config.jsInjectLibs = getInjectFiles(dir);
    };

    config.setIsRelease = function (bool) {
        _isRelease = bool;
        _isDebug = !bool;
        _isTesting = !bool;
        config.isRelease = bool;
        config.isDebug = !bool;
    }
    config.setIsDebug = function (bool) {
        config.isDebug = bool;
        config.isRelease = !bool;
    }

    config.setIsTesting = function (bool) {
        config.isTesting = bool;
        _isTesting = bool;
        config.jsDeploymentLibs = jsDeploymentLibs(config.destinationDir);
        config.jsInjectLibs = getInjectFiles(config.destinationDir);
    }

    config.setJsInjectLibs = function (dir, isMinimizing, isTesting) {
        config.jsInjectLibs = getInjectFiles(dir, isMinimizing, isTesting);
    }

    return config;
};*
