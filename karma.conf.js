module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai', 'riot'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'test/css/index.css',
      'test/spec/**/*.js'
    ],
    preprocessors: {
      'test/spec/**/*.js': ['webpack'],
    },
    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
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
    logLevel: config.LOG_ERROR,
    reporters: ['mocha'],
    browsers: ['ChromeHeadless'],
    singleRun: true
  })
}