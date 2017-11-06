module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai', 'riot'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'https://cdn.jsdelivr.net/semantic-ui/2.2.10/semantic.min.css',
      'tags/**/*'
    ],
    preprocessors: {
      'tags/**/*.spec.js': ['babel'],
      'tags/**/*.tag': ['riot', 'coverage']
    },
    riotPreprocessor: {
      options: {
        type: 'es6'
      }
    },
    logLevel: config.LOG_ERROR,
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [{
        type: 'html',
        dir: 'coverage/'
      }, {
        type: 'text-summary'
      }],
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
      reporters: ['coverage', 'coveralls'],
      coverageReporter: {
        reporters: [{
          type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
          dir: 'coverage/'
        }],
      }
    }
    config.set(configuration);
  }
}