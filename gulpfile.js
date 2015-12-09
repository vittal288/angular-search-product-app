var gulp = require('gulp');
var browserSync = require('browser-sync');
var gulpConfig = require('./gulpConfig')();
var server = require('gulp-develop-server');
var express = require('express');
var path = require('path');
var bowerSrc = require('gulp-bower-src');
var gulpFilter = require('gulp-filter');


//******************************************************************************
//start the server
gulp.task('exposeRESTAPI',function(){

  var app = express();
  app.use(require('./server/rest_api/rest_api'));
  app.listen(9000, function (err) {
      if (err) throw err;
      console.log('REST API IS RUNNING on 9000');
  })

});

gulp.task('serve', function () {
console.log('Application is running with http://localhost:8000');
//var filter = gulpFilter('**/*.js', '!**/*.min.js');
  //sync bower_components to libs
  bowerSrc()
    //.pipe(filter)
		.pipe(gulp.dest(gulpConfig.destinationDir+'/libs'));

  //console.log('destinationDir' ,gulpConfig.destinationDir);
   browserSync({
       notify: false,
       // Customize the BrowserSync console logging prefix
       logPrefix: 'BrowserSync',
       port: 8000,
       /*https: {
           key: "devLib/certificate/key.pem",
           cert: "devLib/certificate/cert.cer"
       },*/
       server:
       {
           baseDir: gulpConfig.destinationDir
       }
   });
});


//
gulp.task('serveDev', ['exposeRESTAPI','serve']);
