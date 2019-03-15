'use strict';

const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const browserSync = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
const sourceMaps = require('gulp-sourcemaps')
const modernizer = require('gulp-modernizer')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const minifyCss = require('gulp-csso')
const concat = require('gulp-concat')

gulp.task('sass', function () {
  return gulp.src('dev/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(sourceMaps.write('.'))
    .pipe(minifyCss())
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(gulp.dest('dist'))
});
