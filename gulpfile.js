'use strict';

const gulp = require('gulp')
// const gulpLoadPlugins = require('gulp-load-plugins')
// const browserSync = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
const sourceMaps = require('gulp-sourcemaps')
// const modernizer = require('gulp-modernizer')
// const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
let cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const gulpStylelint = require('gulp-stylelint')

gulp.task('sass', function () {
  return gulp.src('dev/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer({
			browsers: ['ie 11', 'last 2 versions'],
			cascade: false
		}))
    .pipe(concat('style.css'))
    .pipe(sourceMaps.write('.'))
    .pipe(cleanCSS())
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(gulp.dest('public'))
});
