# semantic-ui-riot

[![npm version](https://badge.fury.io/js/semantic-ui-riot.svg)](https://badge.fury.io/js/semantic-ui-riot)
[![Build Status](https://travis-ci.org/black-trooper/semantic-ui-riot.svg?branch=master)](https://travis-ci.org/black-trooper/semantic-ui-riot)
[![Coverage Status](https://coveralls.io/repos/github/black-trooper/semantic-ui-riot/badge.svg)](https://coveralls.io/github/black-trooper/semantic-ui-riot)
[![GitHub license](https://img.shields.io/github/license/black-trooper/semantic-ui-riot.svg)](https://github.com/black-trooper/semantic-ui-riot/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/semantic-ui-riot.svg)](https://www.npmtrends.com/semantic-ui-riot)

Semantic UI Riot is a set of [Riot](https://riot.js.org) components based on [Semantic UI](https://semantic-ui.com/) markup and CSS.
As a result no dependency on jQuery or Semantic UI's JavaScript is required.

Here is a list of minimal required versions of Riot and Semantic UI for semantic-ui-riot:

semantic-ui-riot |Riot |Semantic UI
-----------------|-----|------------
0.x.x	| 3.0.0	| 2.3.0
1.x.x	| 3.0.0	| 2.3.0
2.x.x	| 4.0.0	| 2.3.0


## Demo
https://semantic-ui-riot.web.app/

## Getting started

### 1) Use in tag file

index.html
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
  <script src="https://unpkg.com/riot@4.6.6/riot+compiler.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/semantic-ui-riot@2.0.0/dist/semantic-ui-riot.js"></script>
</head>

<body>
  <sample></sample>

  <script type="riot" data-src="./app/sample.riot"></script>
  <script>
    riot.compile().then(() => {
      riot.mount("sample");
    });
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
import {component} from 'riot'
import 'semantic-ui-riot'
import Sample from './sample.riot'

component(Sample)(document.getElementById('app'))
```
webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [{
          loader: '@riotjs/webpack-loader'
        }]
      }
    ]
  }
};
```
index.html
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">
</head>
<body>
  <div id="app"></div>
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