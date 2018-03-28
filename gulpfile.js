// SETTINGS
// ============================================
const gulp = require('gulp')
const del = require('del')
const riot = require('gulp-riot')
const concat = require('gulp-concat')
const sort = require('gulp-natural-sort')
const uglify = require('gulp-uglify')
const sequence = require('run-sequence')
const plumber = require("gulp-plumber")
const rename = require('gulp-rename')
const eslint = require('gulp-eslint')
const htmlhint = require("gulp-htmlhint")

const watch_target = [
  'tags/**/*',
  'index.js'
]

// ===================================================================================
//                                                                             Default
//                                                                             =======
gulp.task('default', function () {
  return sequence(
    'build',
    'watch'
  )
})

// ===================================================================================
//                                                                               Build
//                                                                               =====
gulp.task('watch', function () {
  gulp.watch(watch_target, function () {
    sequence(
      'build'
    )
  })
})

gulp.task('build', function () {
  return sequence(
    'clean',
    'htmlhint',
    'eslint',
    'compile',
    'concat',
    'compress'
  )
})

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ])
})

gulp.task('htmlhint', function () {
  return gulp.src(['**/*.tag', '!node_modules/**'])
    .pipe(plumber())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter())
})

gulp.task('eslint', function () {
  return gulp.src(['**/*.tag', 'test/spec/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('compile', function () {
  return gulp.src('tags/**/*.tag')
    .pipe(riot({
      type: 'es6'
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('concat', function () {
  return gulp.src(['dist/**/*.js', '!dist/semantic-ui-riot.*js'])
    .pipe(sort())
    .pipe(concat('semantic-ui-riot.js'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('compress', function () {
  return gulp.src('dist/semantic-ui-riot.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('semantic-ui-riot.min.js'))
    .pipe(gulp.dest('dist/'))
})
