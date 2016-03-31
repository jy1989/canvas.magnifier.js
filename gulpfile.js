var gulp = require('gulp');
var connect = require('gulp-connect');
var prettify = require('gulp-jsbeautifier');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
 
var jsFile = 'canvas.magnifier.js';
var demoJsFile = 'demo.js';
var demoFile = 'demo.html'
gulp.task('prettify', function () {
    gulp.src([jsFile, demoJsFile, demoFile])
        .pipe(prettify({
        js: {
            file_types: ['.js']
        }
    })).pipe(gulp.dest('./'));
});
gulp.task('uglify', function () {
    gulp.src(jsFile)
        .pipe(uglify())
        .pipe(
        rename({
        suffix: '.min'
    }))
        .pipe(gulp.dest('./'));
});
 
gulp.task('connect', function () {
    connect.server({
        port: 1234
    });
});
/*
gulp.task('reload', ['prettify', 'uglify'], function () {
    gulp.src(demoFile)
        .pipe(connect.reload());
});
*/
gulp.task('watch', function () {
    gulp.watch([jsFile, demoJsFile, demoFile], ['prettify', 'uglify']);
 
});
 
gulp.task('default', ['connect', 'watch']);