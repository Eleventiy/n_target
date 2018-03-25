'use strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	pump = require('pump'),
	browserSync = require('browser-sync').create(),
	reloadBrowser = browserSync.reload,
	del = require('del'),
	runSequence = require('run-sequence');


// #########################
// ### Development tasks ###
// #########################

// BrowserSync
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './app'
		},
		notify: false
	});
});

// Compile SASS to CSS
gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.+(scss|sass)')
		.pipe($.plumber({errorHandler: $.notify.onError("Ошибка: <%= error.message %>")}))
		.pipe($.sourcemaps.init())
		.pipe($.sass())
		.pipe($.autoprefixer({ browsers: ['last 2 version'] }))
		.pipe($.cssnano())
		.pipe($.rename({ suffix: '.min' }))
		.pipe($.sourcemaps.write('../maps'))
		.pipe(reloadBrowser({ stream: true }))
		.pipe(gulp.dest('app/css'));
});

// Watching for changes
gulp.task('default', ['browser-sync', 'sass'], function () {

	gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
	gulp.watch('app/js/**/*.js', reloadBrowser);
	gulp.watch('app/*.html', reloadBrowser);
});


// ########################
// ### Production tasks ###
// ########################

// Uglify JS-files
gulp.task('uglify-js', function (cb) {
	pump([
			gulp.src('app/js/common.js'),
			$.plumber({errorHandler: $.notify.onError("Ошибка: <%= error.message %>")}),
			$.sourcemaps.init(),
			$.uglify(),
			$.concat('scripts.js', {newLine: ';'}),
			$.sourcemaps.write('../maps'),
			gulp.dest('app/js')
		],
		cb
	);
});

// Minify images
gulp.task('imagemin', function (cb) {
	pump([
			gulp.src('app/img/**/*.+(jpg|jpeg|png|gif|svg)'),
			$.plumber({errorHandler: $.notify.onError("Ошибка: <%= error.message %>")}),
			$.cache($.imagemin({
				verbose: true,
				interlaced: true,
				progressive: true,
				optimizationLevel: 5,
				svgoPlugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})),
			gulp.dest('dist/img/')
		],
		cb
	)
});

// Clean cache
gulp.task('clean', function(cb) {
	return $.cache.clearAll(cb);
});

// Clear production folder
gulp.task('clear', function() {
	return del.sync(['dist', '!dist/img', '!dist/img/**/*']);
});
