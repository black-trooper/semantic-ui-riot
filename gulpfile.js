// SETTINGS
// ============================================
const gulp = require('gulp')
const del = require('del')
const riot = require('gulp-riot')
const concat = require('gulp-concat')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const sort = require('gulp-natural-sort')
const uglify = require('gulp-uglify')
const sequence = require('run-sequence')
const webserver = require('gulp-webserver-fast')
const plumber = require("gulp-plumber")
const rename = require('gulp-rename')
const eslint = require('gulp-eslint')
const htmlhint = require("gulp-htmlhint")
const escape = require('./gulp-code-escape')
const rimraf = require('rimraf')

const watch_target = [
  'tags/**/*',
  'index.js'
]
const demo_watch_target = [
  'docs/tags/**/*.tag'
]

// ===================================================================================
//                                                                             Default
//                                                                             =======
gulp.task('default', function () {
  return sequence(
    'build',
    'demo_build',
    'webserver',
    'watch',
    'demo_watch'
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
    'compress',
    'demo_copy'
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

// ===================================================================================
//                                                                          Demo Build
//                                                                          ==========
gulp.task('demo_watch', function () {
  gulp.watch(demo_watch_target, function () {
    sequence(
      'demo_build'
    )
  })
})

gulp.task('demo_build', function () {
  return sequence(
    'demo_clean',
    'demo_escape',
    'demo_htmlhint',
    'demo_compile',
    'demo_concat',
    'demo_browserify',
    'demo_compress',
    'demo_clean'
  )
})

gulp.task('demo_clean', function () {
  return del([
    '**/temp.js'
    , 'docs/temp'
  ])
})

gulp.task('demo_escape', function () {
  return gulp.src('docs/tags/**/*.tag')
    .pipe(escape())
    .pipe(gulp.dest('docs/temp/'))
})

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
    .pipe(gulp.dest('docs/temp/'))
})

gulp.task('demo_concat', function () {
  return gulp.src('docs/temp/**/*.js')
    .pipe(sort())
    .pipe(concat('temp.js'))
    .pipe(gulp.dest('docs/'))
})

gulp.task('demo_browserify', function () {
  browserify({
    entries: 'docs/temp.js'
  })
    .transform(babelify)
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('docs/'))
})

gulp.task('demo_compress', function () {
  return gulp.src('docs/build.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('docs/'))
})

gulp.task('demo_copy', function () {
  return gulp.src('dist/semantic-ui-riot.min.js')
    .pipe(gulp.dest('docs/'))
})

// ===================================================================================
//                                                                          Web Server
//                                                                          ==========
gulp.task('webserver', function () {
  const target = [
    'index.html',
    'build.js',
    'semantic-ui-riot.min.js'
  ]
  return gulp.src('./docs')
    .pipe(webserver({
      port: 3000,
      livereload: {
        enable: true,
        filter: function (fileName) {
          return target.indexOf(fileName) >= 0
        }
      },
      directoryListening: true,
      open: true
    }))
})