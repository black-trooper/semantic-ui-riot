const path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'test/spec/checkbox/*',
      'test/spec/radio/*',
      'test/spec/modal/*',
      'test/spec/alert/*',
      'test/css/index.css'
    ],
    preprocessors: {
      'test/spec/**/*.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.tag$/,
            exclude: /node_modules/,
            use: [
              {
                loader: '@riotjs/webpack-loader',
                options: {
                  type: 'es6', // transpile the riot tags using babel
                  hot: true
                }
              }
            ]
          },
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
    logLevel: config.LOG_ERROR,
    reporters: ['mocha', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
    },
    browsers: ['ChromeHeadless'],
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
      reporters: ['coverage-istanbul', 'coveralls'],
      coverageIstanbulReporter: {
        reports: ['lcov'],
      },
    }
    config.set(configuration);
  }
}