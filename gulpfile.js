'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var jshintConfig = require('./package').jshintConfig;
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var htmlhint = require('gulp-htmlhint');
var del = require('del');

// Prevent looking up default files
jshintConfig.lookup = false;

// Build
gulp.task('default', [
  'lint',
  'htmlhint'
]);

// JavaScript Jshint and JSCS
gulp.task('lint', function() {
  return gulp.src([
    'public/**/*.js',
    'server/**/*.js',
    '!public/libraries/**/*.js',
    '*.js'
  ])
  .pipe(jshint(jshintConfig))
  .pipe(jscs())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jscs.reporter());
});

// Sass
gulp.task('sass', function() {
  return gulp.src('public/assets/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('public/assets/css'));
});

// Watch Sass
gulp.task('sass:watch', function() {
  gulp.watch('public/assets/sass/**/*.scss', ['sass']);
});

// htmlhint
gulp.task('htmlhint', function() {
  return gulp.src('public/**/*.html')
  .pipe(htmlhint('.htmlhintrc'))
  .pipe(htmlhint.reporter());
});

// Clean build
gulp.task('clean', function() {
  return del('dist/**');
});