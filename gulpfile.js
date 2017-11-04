'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var jshintConfig = require('./package').jshintConfig;
var jscs = require('gulp-jscs');
var htmlhint = require('gulp-htmlhint');
var del = require('del');

// Prevent looking up default files
jshintConfig.lookup = false;

// Build
gulp.task('default', [
  'lint'
]);

// JavaScript Jshint and JSCS
gulp.task('lint', function() {
  return gulp.src([
    'public/**/*.js',
    'server/**/*.js',
    '*.js'
  ])
  .pipe(jshint(jshintConfig))
  .pipe(jscs())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jscs.reporter());
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