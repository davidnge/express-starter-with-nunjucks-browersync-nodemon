const { series, watch, parallel } = require('gulp');
const browserSync = require("browser-sync").create();
const nodemon = require("gulp-nodemon");

function startBrowserSync(){
  browserSync.init(null, {
      proxy: 'localhost:3777'
  });
}

function reloadHTML(){
  browserSync.reload();
}

function watchFiles(){
  watch(['views/**/*.html','public/assets/**/*.*'], function(){
    reloadHTML();
  });
}

function startNodemon(cb){
  var callbackCalled = false;
    return nodemon({script: 'app.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
}

exports.default = parallel(series(startNodemon, startBrowserSync), watchFiles);