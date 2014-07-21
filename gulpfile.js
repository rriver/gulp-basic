/**
Gulp to:
1. Start the browser sync
2. Process Sass files
3. Reload browser when any files (HTML, CSS, JS) are edited
**/

'use strict';

// Load modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

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
gulp.task('default', ['sass','img'], function () {
});