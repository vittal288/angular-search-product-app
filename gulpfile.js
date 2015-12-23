
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
    flatten =require('gulp-flatten'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass  = require('gulp-sass');




//******************************************************************************
//watch following folders and files
gulp.task('watch', function () {

    console.log('gulp is watching HTML,JS and CSS files...' );
    gulp.watch([gulpConfig.uiCodeBaseDir+'js/**/*.js'],compileReload);
    gulp.watch(gulpConfig.uiCodeBaseDir+'css/**/*.css',compileReload);
    gulp.watch(gulpConfig.uiCodeBaseDir+'sass/*.scss',compileReload);
    gulp.watch(gulpConfig.uiCodeBaseDir+'views/**/*.html',compileReload);
    gulp.watch(gulpConfig.uiCodeBaseDir+'index.html',compileReload);

});


//task to convert SCSS files to CSS files
gulp.task('compileSCSStoCSS',function(){
  gulp.src(gulpConfig.uiCodeBaseDir+'/css/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(gulpConfig.uiCodeBaseDir+'css/'));
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

//create single file out from development folder i,e js folder
gulp.task('scriptsConcat',function(){
  return gulp.src(gulpConfig.uiCodeBaseDir+'/js/**/*.js')

      .pipe(concat('app.min.js'))
      //.pipe(uglify())
      .pipe(gulp.dest(gulpConfig.destinationDir+'/client/ui/js/'));
});

/*gulp.task('uglify',function(){
  return gulp.src(gulpConfig.destinationDir+'/client/ui/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
})*/

gulp.task('serve', function () {

 console.log('Application is running with http://localhost:8000');

 //console.log('Bower SRC ' , gulpConfig.destinationDir);
  //sync bower_components to client/ui/libs
   bowerSrc()
		.pipe(gulp.dest(gulpConfig.uiCodeBaseDir+'/libs'));


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
           baseDir: gulpConfig.destinationDir+'/client/ui/'
       }
   });
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
  return gulp.src([gulpConfig.destinationDir], {read:true})
  .pipe(clean());
});

gulp.task('move',['clean'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure

  //console.log('FILES to Move' , gulpConfig.filesToMove);
  gulp.src(gulpConfig.filesToMove, { base: './' })
  .pipe(gulp.dest(gulpConfig.destinationDir));

});

gulp.task('watchServe',['exposeRESTAPI','watch','serve']);

//
gulp.task('serveDev', ['exposeRESTAPI','serve','watch'],function(){
  console.log('Application is Running from ', gulpConfig.uiCodeBaseDir ,'Directory')
});

gulp.task('default',['clean','move','scriptsConcat','compileSCSStoCSS'])
