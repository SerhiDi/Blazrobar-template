var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');

var sassFiles = 'scss/**/*.scss';

gulp.task('sass', function () {
  gulp.src(sassFiles)
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    })).on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9'],
      cascade: false
    }))
    .pipe(concat('style.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./css/'))

});

gulp.task('watch', function () {
  gulp.watch(sassFiles, ['sass']);
});