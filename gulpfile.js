// SETTINGS
// ============================================
const gulp = require('gulp');
const riot = require('gulp-riot');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sequence = require('run-sequence');
const webserver = require('gulp-webserver-fast');
const plumber = require("gulp-plumber");
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const htmlhint = require("gulp-htmlhint");

const watch_target = [
  'tags/**/*',
  'demo/tags/**/*.tag',
  'index.js'
];

// TASK
// ============================================
gulp.task('default', function () {
  return sequence(
    'webserver',
    'htmlhint',
    'eslint',
    'build',
    'demo_build',
    'watch'
  );
});

gulp.task('build', function () {
  return sequence(
    'compile',
    'concat',
    'compress'
  );
});

gulp.task('compile', function () {
  return gulp.src('tags/**/*.tag')
    .pipe(riot({
      type: 'es6'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('concat', function () {
  return gulp.src(['dist/**/*.js', '!dist/semantic-ui-riot.*js'])
    .pipe(concat('semantic-ui-riot.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('compress', function (cb) {
  return gulp.src('dist/semantic-ui-riot.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('semantic-ui-riot.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
  gulp.watch(watch_target, function () {
    sequence(
      'htmlhint',
      'eslint',
      'build',
      'demo_build'
    );
  });
});

gulp.task('eslint', function () {
  return gulp.src('**/*.tag')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('htmlhint', function () {
  return gulp.src('**/*.tag')
    .pipe(plumber())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter())
})

// for demo
gulp.task('demo_build', function () {
  return sequence(
    'demo_compile',
    'demo_concat',
    'demo_compress'
  );
});

gulp.task('demo_compile', function () {
  return gulp.src('demo/tags/**/*.tag')
    .pipe(riot({
      type: 'es6'
    }))
    .pipe(gulp.dest('demo/dist/'));
});

gulp.task('demo_concat', function () {
  return gulp.src(['demo/dist/**/*.js', '!demo/dist/build.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('demo/'));
});

gulp.task('demo_compress', function (cb) {
  return gulp.src('demo/build.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('demo/'));
});

gulp.task('webserver', function () {
  return gulp.src('./')
    .pipe(webserver({
      port: 3000,
      livereload: true,
      directoryListening: true,
      open: true
    }));
});