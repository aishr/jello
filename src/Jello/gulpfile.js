/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

"use strict";

var gulp  = require('gulp');
var sass  = require('gulp-sass');
var watch = require('gulp-watch');

var webroot = "./ClientApp/";
var paths = {
    scss: webroot + "scss/**/site.scss",
    scssDest: webroot + "css/"
};

gulp.task('default', function () {
    // place code for your default task here
    gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.scssDest));
});

gulp.task('watch', function () {
    watch(paths.scss, function () {
        gulp.start('default');
    });
});
