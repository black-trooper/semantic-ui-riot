const webpackDateFnsExternals = require('webpack-date-fns-externals');

module.exports = (env, argv) => {
  return {
    output: {
      path: __dirname + (argv.hot ? '/../semantic-ui-riot-docs/src/' : '/dist/'),
      filename: argv.mode === 'production' ? 'semantic-ui-riot.min.js' : 'semantic-ui-riot.js',
      library: 'SemanticUiRiot',
      libraryTarget: 'umd'
    },
    externals: [
      { riot: 'riot' },
      webpackDateFnsExternals()
    ],
    module: {
      rules: [
        {
          test: /\.tag$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'riot-tag-loader',
              options: {
                hot: true
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    devtool: false,
  }
}
