var gulp = require('gulp'),
		browserify = require('browserify'), 
		source = require('vinyl-source-stream'),
		babelify = require('babelify'),
		sourcemaps = require('gulp-sourcemaps'),
		notify = require('gulp-notify'),
		buffer = require('gulp-buffer'), 
		uglify = require('gulp-uglify'),
		sass = require('gulp-sass'),
		minifyCSS = require('gulp-minify-css'),
		concat = require('gulp-concat'),
		autoprefixer = require('gulp-autoprefixer');
		plumber = require('gulp-plumber');


gulp.task('styles', function() {
	return gulp.src('./sass/**/*.scss')
		.pipe(plumber({
		  errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(concat('style.css'))
		.pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./app/styles'));
});

gulp.task('js', function() {
	browserify('./app.jsx')
		.transform(babelify,{presets: ["es2015", "react"]})
		.bundle().on('error', notify.onError({
      title: "JSX Error",
      message: "<%= error.message %>"
    }))
		.pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/js'));
});


gulp.task('watch', function(){
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('./app.jsx', ['js']);
	});

gulp.task('default', ['styles', 'js', 'watch']);
