# Google Translate Node JS

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
