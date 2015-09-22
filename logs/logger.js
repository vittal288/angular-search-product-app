var winston = require('winston');
//var fs = require('fs');
logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: __dirname + '/app.log', json: false })
    ]   
});
module.exports = logger;