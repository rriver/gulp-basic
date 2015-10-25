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
var sass = require('gulp-ruby-sass');
var postcss = require('gulp-postcss');

var browserSync = require('browser-sync').create();
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');


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

// PostCSS processes
var processors = [
  autoprefixer(AUTOPREFIXER_BROWSERS),
  mqpacker,
  cssnano
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
  gulp.watch(['dev/css/*.css'], ['postcss']);
  gulp.watch(['dev/**/*.html']).on('change', browserSync.reload);
  gulp.watch(['dev/img/*']).on('change', browserSync.reload);
});

// Process Sass
gulp.task('sass', function () {
  return sass('dev/scss/*.scss', { sourcemap: true } )
    .on('error', sass.logError)
    .pipe(postcss(processors))
    .pipe($.sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: '../../scss'
    }))
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// Process CSS and combine media queries
gulp.task('postcss', function () {
  gulp.src('dev/css/*.css')
    .pipe(postcss(processors))
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
gulp.task('default', ['sass','postcss','img'], function () {
});