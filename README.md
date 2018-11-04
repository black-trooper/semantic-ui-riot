# semantic-ui-riot

[![npm version](https://badge.fury.io/js/semantic-ui-riot.svg)](https://badge.fury.io/js/semantic-ui-riot)
[![Build Status](https://travis-ci.org/black-trooper/semantic-ui-riot.svg?branch=master)](https://travis-ci.org/black-trooper/semantic-ui-riot)
[![Coverage Status](https://coveralls.io/repos/github/black-trooper/semantic-ui-riot/badge.svg)](https://coveralls.io/github/black-trooper/semantic-ui-riot)
[![GitHub license](https://img.shields.io/github/license/black-trooper/semantic-ui-riot.svg)](https://github.com/black-trooper/semantic-ui-riot/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/semantic-ui-riot.svg)](https://www.npmtrends.com/semantic-ui-riot)

Semantic UI module for Riot.

## Demo
https://black-trooper.github.io/semantic-ui-riot-docs/

## Getting started

### 1) Use in tag file

index.html
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.3.3/dist/semantic.min.css">
</head>
<body>
  <sample></sample>
  <script type="riot/tag" src="sample.tag"></script>
  <script src="https://cdn.jsdelivr.net/npm/riot@3.9/riot+compiler.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.29.0/date_fns.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/semantic-ui-riot/dist/semantic-ui-riot.min.js"></script>
  <script>
    riot.mount('sample');
  </script>
</body>
</html>
```
sample.tag
```html
<sample>
  <su-checkbox>Make my profile visible</su-checkbox>
</sample>
```

### 2) Use with webpack
```sh
npm install --save semantic-ui-riot
```
index.js
```javascript
import riot from 'riot'
import 'semantic-ui-riot'
import './app.tag'
riot.mount('app')
```
webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        use: 'riot-tag-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.ProvidePlugin({
      riot: 'riot',
    })
  ]
};
```
index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.3.3/dist/semantic.min.css">
  </head>
  <body>
    <sample></sample>
    <script src="main.js"></script>
  </body>
</html>
```
sample.tag
```html
<sample>
  <su-checkbox>Make my profile visible</su-checkbox>
</sample>
```