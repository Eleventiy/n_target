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

// Compile SCSS to CSS
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

// Uglify JS-files
gulp.task('uglify-js', function (cb) {
	pump([
			gulp.src('app/js/common.js'),
			$.plumber({errorHandler: $.notify.onError("Ошибка: <%= error.message %>")}),
			$.sourcemaps.init(),
			$.uglify(),
			$.sourcemaps.write('../maps'),
			$.concat('common.min.js', {newLine: ';'}),
			gulp.dest('app/js')
		],
		cb
	);
});


// ########################
// ### Production tasks ###
// ########################

// Copy fonts to production folder
gulp.task('fonts', function () {
	return gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

// Copy SCSS to production folder
gulp.task('sass:build', function () {
	return gulp.src('app/scss/**/*.+(scss|sass)').pipe(gulp.dest('dist/scss'));
});

// Copy CSS to production folder
gulp.task('css:build', function () {
	return gulp.src('app/css/**/*').pipe(gulp.dest('dist/css'));
});

// Copy JS to production folder
gulp.task('scripts:build', function () {
	return gulp.src('app/js/**/*.js').pipe(gulp.dest('dist/js'));
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

// Build production folder
gulp.task('build', function () {
	runSequence(['clean', 'clear', 'imagemin'], ['fonts', 'sass:build', 'css:build', 'scripts:build']);
	gulp.src('app/*.html').pipe(gulp.dest('dist/'));
});
