
var browserSync = require('browser-sync');
var gulpConfig = require('./gulpConfig')();
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var gulp = require('gulp'),
    bowerSrc = require('gulp-bower-src'),
    server = require('gulp-develop-server'),
    gulpFilter = require('gulp-filter'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    flatten =require('gulp-flatten');




//******************************************************************************
//watch following folders and files
gulp.task('watch', function () {

    console.log('gulp is watching HTML,JS and CSS files...' );
    gulp.watch([gulpConfig.uiCodeBaseDir+'js/**/*.js'],compileReload);    
    gulp.watch(gulpConfig.uiCodeBaseDir+'css/*.css',compileReload);
    gulp.watch(gulpConfig.uiCodeBaseDir+'views/**/*.html',compileReload);
    gulp.watch(gulpConfig.uiCodeBaseDir+'index.html',compileReload);
});

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
    //.pipe(gulp.dest(gulpConfig.destinationDir+'/libs'));

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
           //baseDir: gulpConfig.destinationDir+gulpConfig.serveDir
           baseDir: gulpConfig.uiCodeBaseDir
       }
   });
});

gulp.task('copyFilesToDest',function(){

});

function compileReload() {
    runSequence(
             //'compileTS',
             'move',
             //'injectToIndexHtmlNoUnitTests',
             browserSync.reload
           );

    //browserSync.reload
}

gulp.task('clean', function(){
  console.log('Destination Dir' , gulpConfig.destinationDir)
  return gulp.src([gulpConfig.destinationDir], {read:true})
  .pipe(clean());
});

gulp.task('move',['clean'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(gulpConfig.filesToMove, { base: './' })
  .pipe(gulp.dest(gulpConfig.destinationDir));

});

gulp.task('watchServe',['exposeRESTAPI','watch','serve']);

//
gulp.task('serveDev', ['exposeRESTAPI','serve','watch'],function(){
  console.log('Application is Running from ', gulpConfig.uiCodeBaseDir ,'Directory')
});

gulp.task('default',['clean','move'])
