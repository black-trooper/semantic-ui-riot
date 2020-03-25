const path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test/spec/globals.js',
      'test/spec/**/*'
    ],
    preprocessors: {
      'test/spec/**/*.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
      node: {
        fs: "empty"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'post',
            include: path.resolve('dist/tags/'),
            use: ['istanbul-instrumenter-loader']
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
    },
    webpackMiddleware: {
      stats: 'errors-only',
    },
    logLevel: config.LOG_ERROR,
    reporters: ['mocha', 'coverage-istanbul'],
    mochaReporter: {
      output: 'minimal',
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
    },
    browsers: ['ChromeHeadless'],
    browserNoActivityTimeout: 30 * 60 * 1000,
    singleRun: true
  })
  if (process.env.TRAVIS) {
    var configuration = {
      customLaunchers: {
        chromeTravisCi: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      },
      browsers: ['chromeTravisCi'],
      reporters: ['coverage-istanbul', 'coverage'],
      coverageIstanbulReporter: {
        reports: ['lcov'],
      },
    }
    config.set(configuration);
  }
}