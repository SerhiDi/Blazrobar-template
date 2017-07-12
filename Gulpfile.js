var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');


var sassFiles = 'scss/**/*.scss';

gulp.task('sass', function () {
  gulp.src(sassFiles)
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    })).on('error', sass.logError)
    .pipe(minifycss())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css/'))
});

gulp.task('watch', function () {
  gulp.watch(sassFiles, ['sass']);
});