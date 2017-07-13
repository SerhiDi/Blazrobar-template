var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');

var sassFiles = 'scss/**/*.scss';

gulp.task('sass', function () {
  gulp.src('./scss/style.scss')
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    })).on('error', sass.logError)
    .pipe(minifycss())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9'],
      cascade: false
    }))
    .pipe(concatCss("style.css"))
    .pipe(gulp.dest('./css/'))

});

gulp.task('watch', function () {
  gulp.watch(sassFiles, ['sass']);
});