var gulp = require('gulp'),
// these will handle converting our ES6 and JSX into browser-friendly JS 
		browserify = require('browserify'), 
		babelify = require('babelify'),
//this package converts what browserify gives us into something gulp can read
		source = require('vinyl-source-stream'),
// here are all our packages to compile sass and minify our code		
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		notify = require('gulp-notify'),
		buffer = require('gulp-buffer'), 
		uglify = require('gulp-uglify'),
		minifyCSS = require('gulp-minify-css'),
		concat = require('gulp-concat'),
		autoprefixer = require('gulp-autoprefixer');
		plumber = require('gulp-plumber');



gulp.task('js', function() {
	// take the code in our react app and...
	browserify('./app.jsx')
	//transform ES6 and JSX into JavaScript
		.transform(babelify,{presets: ["es2015", "react"]})
		//compile it into one file and tell us if there is any errors
		.bundle().on('error', notify.onError({
      title: "JSX Error",
      message: "<%= error.message %>"
    }))
    // minify it 
		.pipe(source('app.min.js'))
    .pipe(buffer())
    // allow for console errors to point us to the problem in our working file
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    // put the compiled JS into our production folder 
		.pipe(gulp.dest('app/js'));
});

// styles task not needed for react, but maybe you want this to look like something
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



// watch sass folder for style changes, and jsx file for JS changes
gulp.task('watch', function(){
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('./app.jsx', ['js']);
	});

// run all of these tasks when gulp is started, and then run the watch task
gulp.task('default', ['styles', 'js', 'watch']);
