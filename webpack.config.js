const webpackDateFnsExternals = require('webpack-date-fns-externals');
const htmlhintRiotRules = require('htmlhint-riot-rules')

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
              loader: 'riotjs-loader',
              options: {
                type: 'es6', // transpile the riot tags using babel
                hot: true
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                fix: true,
                emitWarning: true,
              }
            },
            {
              loader: 'htmlhint-loader',
              options: {
                customRules: htmlhintRiotRules(),
                // 'file-line-limit': 100,
                'tag-name-include-hyphen': true,
                'use-script-inside-tag': true,
                // 'tag-expressions-simple': 15,
                // 'tag-options-primitive': true,
                'assign-this-to-tag': { force: true },
                'properties-and-methods-order': { alphabetize: false },
                'fake-es6-syntax-disabled': true,
                // 'tag-parent-disabled': true,
                'use-each-in-syntax': true
              }
            }
          ]

        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {
                fix: true,
                emitWarning: true,
              },
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