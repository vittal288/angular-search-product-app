
var browserSync = require('browser-sync');
var gulpConfig = require('./gulpConfig')();
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var fs = require('fs-extra');
var gulp = require('gulp'),
    bowerSrc = require('gulp-bower-src'),
    server = require('gulp-develop-server'),
    gulpFilter = require('gulp-filter'),
    runSequence = require('run-sequence'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    flatten =require('gulp-flatten'),
    concat = require('gulp-concat-sourcemap'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    Server = require('karma').Server,
    jasmineBrowser = require('gulp-jasmine-phantom'),
    sass  = require('gulp-sass');


//******************************************************************************
//watch following folders and files
gulp.task('watch', function () {

    console.log('gulp is watching HTML,JS and CSS files...' );
    gulp.watch([gulpConfig.sourceDir+'/js/**/*.js'],compileReload);
    gulp.watch(gulpConfig.sourceDir+'/css/**/*.css',compileReload);
    gulp.watch(gulpConfig.sourceDir+'/sass/*.scss',compileReload);
    gulp.watch(gulpConfig.sourceDir+'/views/**/*.html',compileReload);
    gulp.watch(gulpConfig.sourceDir+'/index.html',compileReload);

});


//task to convert SCSS files to CSS files
gulp.task('compileSCSStoCSS',function(){
  gulp.src(gulpConfig.sourceDir+'/css/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(gulpConfig.sourceDir+'/css/'));
});
//start the server
gulp.task('exposeRESTAPI',function(){

  var app = express();
  app.use(require('./server/rest_api/rest_api'));
  app.listen(gulpConfig.restapi.port, function (err) {
      if (err) throw err;
      console.log('REST API RUNNING with  '+gulpConfig.restapi.protocol+'://'+gulpConfig.restapi.host+':'+gulpConfig.restapi.port+gulpConfig.restapi.path);
  });

});

//create single file out from development folder i,e js folder
gulp.task('concat',function(){ 
  return gulp.src(gulpConfig.sourceDir+'/js/**/*.js')
        .pipe(concat('app.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(gulpConfig.destinationDir+'/js/'));
});

gulp.task('serve', function () {
 console.log('Application is running with http://localhost:8000');
 
   browserSync({
       notify: false,       
       logPrefix: 'BrowserSync',
       port: 8000,      
       server:
       {           
           baseDir: gulpConfig.destinationDir+'/'+gulpConfig.sourceDir
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
}

gulp.task('clean', function(){
  return gulp.src([gulpConfig.destinationDir], {read:true})
  .pipe(clean());
});

gulp.task('move',['clean'], function(){

  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(gulpConfig.filesToMove, { base: './' })
  .pipe(gulp.dest(gulpConfig.destinationDir));


  //pack all bower components to libs directory of dest
  gulp.src(['bower_components/**/*.min.js',
            'bower_components/**/*.-min.js',
            'bower_components/**/*.css',
            'bower_components/**/*.eot',
            'bower_components/**/*.ttf',
            'bower_components/**/*.svg',
            'bower_components/**/*.woff',
            'bower_components/**/*.woff2'])
  .pipe(flatten({ includeParents: [1,1]}))
  .pipe(gulp.dest(gulpConfig.destinationDir+'/app/libs'));

});


//unit testing
gulp.task('unitTest',function(done){
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
    }, done).start();
});


gulp.task('devbuild',['compileSCSStoCSS','concat','move','webServe']);

gulp.task('webServe', ['compileSCSStoCSS','exposeRESTAPI','serve','watch'],function(){
  console.log('Application is Running from ', gulpConfig.destinationDir);
});



gulp.task('test',['unitTest']);
