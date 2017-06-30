// Grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    //cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    bower = require('gulp-bower'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();

// Compile Sass, Autoprefix and minify
gulp.task('styles', function() {
    return gulp.src('./assets/styles/**/*.scss')
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(sourcemaps.init()) // Start Sourcemaps
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./static/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.')) // Creates sourcemaps for minified styles
        .pipe(gulp.dest('./static/css/'))
});

gulp.task('admin', function () {
    gulp.src('./assets/admin/*')
        .pipe(gulp.dest('./static/admin'));
});

gulp.task('fonts', function () {
    gulp.src('./assets/fonts/*')
        .pipe(gulp.dest('./static/fonts'));
});

gulp.task('images', function () {
    gulp.src('./assets/images/uploads/*')
        .pipe(gulp.dest('./static/images/uploads'));
});

gulp.task('bullets-js', function() {
  return gulp.src([
    './assets/scripts/*.js',
  ])
	.pipe(babel({
		presets: ['es2015'],
	    compact: true
	}))
    .pipe(sourcemaps.init())
    .pipe(concat('bullets.js'))
    .pipe(gulp.dest('./static/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.')) // Creates sourcemap for minified JS
    .pipe(gulp.dest('./static/js'))
});


// Browser-Sync watch files and inject changes
gulp.task('browsersync', function() {
    // Watch files
    var files = [
    	'./assets/styles/*.css',
    	'./assets/scripts/*.js',
    	'**/*.php',
    	'assets/img/**/*.{png,jpg,gif,svg,webp}',
    ];

    browserSync.init(files, {
	    // Replace with URL of your local site
	    proxy: "http://localhost/",
    });

    gulp.watch('./assets/styles/**/*.scss', ['styles']);
    gulp.watch('./assets/scripts/*.js', ['bullets-js']).on('change', browserSync.reload);

});

// Watch files for changes (without Browser-Sync)
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('./assets/styles/**/*.scss', ['styles']);

  // Watch bullets-js files
  gulp.watch('./assets/scripts/*.js', ['bullets-js']);


});

// Run styles and bullets-js
gulp.task('default', ['styles', 'bullets-js', 'admin', 'fonts', 'images']);