/**
 * Gulp File
 *
 * To compile SCSS: npm run build-css
 * To compile and watch SCSS: npm run watch-css
 */

var gulp = require('gulp');

/**
 * CSS postprocesses.
 */
gulp.task('autoprefixer', function () {
  var postcss      = require('gulp-postcss');
  var sourcemaps   = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');

  return gulp.src('./dest/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest/css'));
});
