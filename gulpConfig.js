module.exports = function () {
      
    var _destinationDir = './dist',
        _sourceDir = './app',
        _serverCodeBaseDir = './server';
   

    var _filesToMove = [            
        _sourceDir+'/**/*'
    ];
    var config = {
          destinationDir: _destinationDir,         
          serverCodeBaseDir:_serverCodeBaseDir,
          filesToMove:_filesToMove,
          sourceDir:_sourceDir,
          restapi:{
              protocol:'http',
              host:'localhost',
              port:9000,
              path:'/rest-api/'              
          }
        };
    return config;
};
