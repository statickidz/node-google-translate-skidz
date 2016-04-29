Google Translate API client for node.js for free.

```js
var translate = require('../lib/translate');

translate({
  text: 'text',
  source: 'es',
  target: 'en'
}, function(result) {
  console.log(result);
});
```
