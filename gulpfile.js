// SETTINGS
// ============================================
const gulp = require('gulp');
const del = require('del');
const riot = require('gulp-riot');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sort = require('gulp-natural-sort')
const uglify = require('gulp-uglify');
const sequence = require('run-sequence');
const webserver = require('gulp-webserver-fast');
const plumber = require("gulp-plumber");
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const htmlhint = require("gulp-htmlhint");
const escape = require('./gulp-code-escape');
const rimraf = require('rimraf');

const watch_target = [
  'tags/**/*',
  'docs/tags/**/*.tag',
  'index.js'
];

// TASK
// ============================================
gulp.task('default', function () {
  return sequence(
    'webserver',
    'htmlhint',
    'eslint',
    'clean',
    'build',
    'demo_build',
    'watch'
  );
});

gulp.task('clean', function () {
  return del([
    'dist/**/*',
    'docs/dist/**/*'
  ]);
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
    .pipe(sort())
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
      'clean',
      'build',
      'demo_build'
    );
  });
});

gulp.task('eslint', function () {
  return gulp.src(['**/*.tag', 'test/spec/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('htmlhint', function () {
  return gulp.src(['**/*.tag', '!node_modules/**'])
    .pipe(plumber())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter())
})

// for demo
gulp.task('demo_build', function () {
  return sequence(
    'demo_escape',
    'demo_htmlhint',
    'demo_compile',
    'demo_clean',
    'demo_concat',
    'demo_browserify',
    'demo_compress',
    'demo_copy'
  );
});

gulp.task('demo_escape', function () {
  return gulp.src('docs/tags/**/*.tag')
    .pipe(escape())
    .pipe(gulp.dest('docs/temp/'));
});

gulp.task('demo_htmlhint', function () {
  return gulp.src('docs/temp/**/*.tag')
    .pipe(plumber())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter())
})

gulp.task('demo_compile', function () {
  return gulp.src('docs/temp/**/*.tag')
    .pipe(riot({
      type: 'es6'
    }))
    .pipe(gulp.dest('docs/dist/'));
});

gulp.task('demo_clean', function (cb) {
  return rimraf('docs/temp', cb);
});

gulp.task('demo_concat', function () {
  return gulp.src(['docs/dist/**/*.js', '!docs/dist/build.js'])
    .pipe(sort())
    .pipe(concat('build.js'))
    .pipe(gulp.dest('docs/'));
});

gulp.task('demo_browserify', function () {
  browserify({
    entries: 'docs/build.js'
  })
    .transform(babelify)
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('docs/'));
});

gulp.task('demo_compress', function (cb) {
  return gulp.src('docs/build.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('docs/'));
});

gulp.task('demo_copy', function () {
  return gulp.src('dist/semantic-ui-riot.min.js')
    .pipe(gulp.dest('docs/'))
})

gulp.task('webserver', function () {
  return gulp.src('./docs')
    .pipe(webserver({
      port: 3000,
      livereload: true,
      directoryListening: true,
      open: true
    }));
});