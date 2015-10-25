/**
Gulp to:
1. Process Sass files
2. Optimize images
3. Reload browser when any files (HTML, SCSS, Images) are edited
**/

'use strict';

// Load modules
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var mmq = require('gulp-merge-media-queries');

// Set browsers for autoprefixer
var AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Start BrowserSync
gulp.task('bs', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'dev'
    }
  });

  gulp.watch(['dev/**/*.scss'], ['sass']);
  gulp.watch(['dev/css/*.css'], ['mmq']);
  gulp.watch(['dev/**/*.html']).on('change', browserSync.reload);
  gulp.watch(['dev/img/*']).on('change', browserSync.reload);
});

// Process Sass and notify with Mac notification if any errors
gulp.task('sass', function () {
  return sass('dev/scss/*.scss', { sourcemap: true } )
    .on('error', sass.logError)
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'dev'
    }))
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// Process CSS and combine media queries
gulp.task('mmq', function () {
  gulp.src('dev/css/*.css')
    .pipe(mmq())
    .pipe(gulp.dest('dist/css'));
});

// Optimize images in the img folders anywhere
gulp.task('img', function () {
  return gulp.src('dev/img/**')
    .pipe($.newer('dist/img/**'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe($.size({title: 'img'}));
});


// Default task to be run with `gulp`
gulp.task('default', ['sass','mmq','img'], function () {
});