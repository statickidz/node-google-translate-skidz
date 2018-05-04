# Google Translate Node JS [![Build Status](https://travis-ci.org/statickidz/node-google-translate-skidz.svg?branch=master)](https://travis-ci.org/statickidz/node-google-translate-skidz)

Google Translate API client for node.js. 

## Install

```js
npm install node-google-translate-skidz --save
```

## USAGE

```js
var translate = require('node-google-translate-skidz');

translate({
  text: 'text',
  source: 'es',
  target: 'en'
}, function(result) {
  console.log(result);
});
```
