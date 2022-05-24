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
    reporters: ['mocha'],
    mochaReporter: {
      output: 'minimal',
    },
    browsers: ['ChromeHeadless'],
    browserNoActivityTimeout: 30 * 60 * 1000,
    singleRun: true
  })
}