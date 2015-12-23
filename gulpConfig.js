module.exports = function () {

    //var environments = require('./devLib/utils/environments');
    //var _destinationDir = './client/ui/';
    var _destinationDir = './output';
    var _uiCodeBaseDir = './client/ui/';
    var _serverCodeBaseDir = './server';
    var _serveDir = '/client/ui';

    var _filesToMove = [
        _uiCodeBaseDir+'/admin/**/*.*',
        _uiCodeBaseDir+'/css/**/*.*',
        _uiCodeBaseDir+'/img/**/*.*',
        //_uiCodeBaseDir+'/js/**/*.*',
        _uiCodeBaseDir+'/libs/**/*.*',
        _uiCodeBaseDir+'/views/**/*.*',
        _uiCodeBaseDir+'/index.html',
    ];
    var config = {
          destinationDir: _destinationDir,
          serveDir:_serveDir,
          serverCodeBaseDir:_serverCodeBaseDir,
          filesToMove:_filesToMove,
          uiCodeBaseDir:_uiCodeBaseDir
        }
    return config;
};
