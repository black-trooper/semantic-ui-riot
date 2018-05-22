const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    path: __dirname + '/dist/',
    filename: 'semantic-ui-riot.js'
  },
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
  // plugins: [
  //   new webpack.LoaderOptionsPlugin({ options: {} }),
  //   new webpack.ProvidePlugin({
  //     riot: 'riot',
  //   })
  // ]
}