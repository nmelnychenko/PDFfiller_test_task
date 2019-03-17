"use strict";

const gulp = require("gulp");
// const gulpLoadPlugins = require('gulp-load-plugins')
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const sourceMaps = require("gulp-sourcemaps");
const modernizr = require("gulp-modernizr");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const gulpStylelint = require("gulp-stylelint");
const pug = require("gulp-pug");
const runseq = require("run-sequence");
const clean = require("gulp-clean");

gulp.task("pug", function() {
  return gulp
    .src("dev/pages/*.jade")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("public"));
});

gulp.task("script", function() {
  gulp
    .src("dev/js/**/*.js")
    .pipe(
      modernizr({
        options: ["setClasses", "addTest"],
        tests: ["hovermq"]
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(gulp.dest("public/js"));
});

gulp.task("fonts", function() {
  gulp
    .src("dev/fonts/*.{ttf,woff,woff2}")
    .pipe(gulp.dest("public/fonts/"));
});

gulp.task("sass", function() {
  return gulp
    .src("dev/sass/style.scss")
    .pipe(plumber())
    .pipe(
      gulpStylelint({
        reporters: [{ formatter: "string", console: true }]
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(sourceMaps.init())
    .pipe(
      autoprefixer({
        browsers: ["ie 11", "last 2 versions"],
        cascade: false
      })
    )
    .pipe(rename("style.css"))
    .pipe(sourceMaps.write("."))
    .pipe(cleanCSS())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(gulp.dest("public/css"));
});

gulp.task("clean", function() {
  return gulp.src("public", { read: false }).pipe(clean());
});

gulp.task("build", function() {
  runseq("clean", "pug", "fonts", "sass", "script");
});

gulp.task("watchHtml", function() {
  gulp.watch("dev/**/*.jade", ["pug"]);
});

gulp.task("watchCss", function() {
  gulp.watch("dev/sass/**/*.scss", ["sass"]);
});

gulp.task("watchScript", function() {
  gulp.watch("dev/js/**/*.js", ["script"]);
});

gulp.task("watch", function() {
  runseq("watchHtml", "watchCss", "watchScript");
});

gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: "public/"
    },
    notify: false,
    files: ["public/*.html", "public/css/*.css", "public/js/*.js"]
  });
});

gulp.task("default", function() {
  runseq("build", "watch", "server");
});
