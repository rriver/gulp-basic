/**
Gulp to:
1. Process Sass files
2. Optimize images
3. Reload browser when any files (HTML, SCSS, Images) are edited
**/

'use strict';

// Load modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cmq = require('gulp-combine-media-queries');

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
  browserSync({
    notify: false,
    server: {
      baseDir: 'dev'
    }
  });

  gulp.watch(['dev/**/*.html'], reload);
  gulp.watch(['dev/**/*.scss'], ['sass']);
  gulp.watch(['dev/img/*'], reload);
});

// Process Sass and notify with Mac notification if any errors
gulp.task('sass', function () {
  return gulp.src('dev/scss/*.scss')
    .pipe($.rubySass({
      sourcemap: true,
      sourcemapPath: '../dev/scss',
      style: 'compact',
      precision: 4,
      loadPath: process.cwd() + '/dev/scss'
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dev/css'))
    .pipe(reload({stream:true}));
});

// Process CSS and combine media queries
gulp.task('cmq', function () {
  gulp.src('dev/css/*.css')
    .pipe(cmq())
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
gulp.task('default', ['sass','cmq','img'], function () {
});