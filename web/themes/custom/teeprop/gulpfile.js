/**
 * Gulp File
 *
 * To compile SCSS: gulp build-css
 * To minify JS: gulp build-js
 * To compile/minify all: gulp build
 * To compile/minify and watch SCSS and JS: gulp watch
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const glob = require('gulp-sass-glob');
const minifycss = require('gulp-clean-css');
const minifyjs = require('gulp-minify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sassLint = require('gulp-sass-lint');
const addsrc = require('gulp-add-src');


// Task: Build library CSS.
gulp.task('compile-lib-css', function() {
  return gulp
    .src([
      './lib/dropkickjs/build/css/dropkick.css',
      './lib/slick/slick.css',
      './lib/slick/slick-theme.css'
    ])
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
});

// Task: Compile CSS.
gulp.task('compile-css', function() {
  return gulp
    .src([
      './scss/style.scss'
    ])
    .pipe(
      sass({
        includePaths: [
          './node_modules/singularitygs/stylesheets/',
          './node_modules/breakpoint-sass/stylesheets/'
        ],
        errLogToConsole: true,
      })
    )
    .pipe(
      plumber({
        errorHandler: function(error) {
          notify.onError({
            title: 'Gulp',
            subtitle: 'Failure!',
            message: 'Error: <%= error.message %>',
            sound: 'Beep',
          })(error);
          this.emit('end');
        },
      })
    )
    .pipe(sourcemaps.init())
    .pipe(glob())
    .pipe(
      autoprefixer({
        BrowsersList: ['last 2 versions', '> 1%', 'ie 9', 'ie 10'],
      })
    )
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
});

// Task: Build library JS.
gulp.task('compile-lib-js', function() {
  return gulp
    .src([
      './lib/dropkickjs/build/js/dropkick.min.js',
      './lib/slick/slick.min.js'
    ])
    .pipe(gulp.dest('./build/js'));
});

// Task: Build JS.
gulp.task('compile-js', function() {
  return gulp
    .src([
      './js/*.js',
    ])
    .pipe(
      plumber({
        errorHandler: function(error) {
          notify.onError({
            title: 'Gulp',
            subtitle: 'Failure!',
            message: 'Error: <%= error.message %>',
            sound: 'Beep',
          })(error);
          this.emit('end');
        },
      })
    )
    .pipe(minifyjs({
      ext: {
        src: '.js',
        min: '.min.js',
      },
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});


// Task: Lint SCSS files using sass-lint.
gulp.task('lint-scss', function() {
  return gulp
    .src(['./scss/**/*.scss'])
    .pipe(sassLint({
      options: {
        configFile: './.sass-lint.yml',
        formatter: 'stylish'
      },
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});


// Task: Build CSS and run sass-lint to notify of any errors (but not fix them).
gulp.task('build-css', gulp.series('compile-css', 'compile-lib-css', 'lint-scss'));


// Task: Build all JS for theme and libraries.
gulp.task('build-js', gulp.series('compile-js', 'compile-lib-js'));


// Task: Build both CSS and JS.
gulp.task('build', gulp.series('build-css', 'build-js'));


// Task: Watch both CSS and JS.
gulp.task('watch', function() {
  gulp.watch('./js/**/*.js', function() {
    gulp.series('build-js');
  });
  gulp.watch('./scss/**/*.scss', function() {
    gulp.series('build-css');
  });
});

// Task: Default Task.
gulp.task('default', gulp.series('build-css', 'build-js', 'watch'));
