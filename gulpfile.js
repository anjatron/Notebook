const gulp = require('gulp');
const del = require('del');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');

const sass = require('gulp-sass');

const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// remove our dist directory
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('lint', function () {
    return gulp.src('src/pages/**/**')
        .pipe(eslint())
        .pipe(eslint.format())
});


// copy index html file
gulp.task('html', ['clean'], function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
});

// copy scss fils to dist
// gulp.task('sass', ['clean'], function() {
//     return gulp.src('src/sass/app.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('dist/css'));
// });

// webpack build our scripts
gulp.task('webpack', ['clean'], function() {
    return gulp.src('src/app.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('dist/js'));
  });
// gulp.task('webpack', function(callback) {
//     webpack(webpackConfig, function(err, stats) {
//         if(err) throw new gutil.PluginError("webpack", err);
//         gutil.log("[webpack]", stats.toString({
//             colors: true
//         }));
//         callback();
//     });
// });

gulp.task('default', ['html', 'webpack']);

