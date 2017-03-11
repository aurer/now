var gulp = require('gulp');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var server = require('browser-sync');
var imagemin = require('gulp-imagemin');

gulp.task('less', function() {
	gulp.src('src/less/app.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest('public/css'))
		.pipe(server.stream());
});

gulp.task('js', function() {
	gulp.src('src/js/app.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(server.stream());
});

gulp.task('gfx', function() {
	gulp.src('src/gfx/*')
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('public/gfx'))
		.pipe(server.stream());
});

gulp.task('serve', ['less'], function() {
	server.init({
		server: 'public'
	});

	gulp.watch('src/less/*.less', ['less']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/gfx/*', ['gfx']);
	gulp.watch('public/index.html').on('change', server.reload);
});

gulp.task('default', ['less', 'js', 'gfx']);
gulp.task('dev', ['default', 'serve']);
