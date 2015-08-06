Google Translate API client for node.js. The new API (v2) is a paid service. To create a key, you'll need to go here https://code.google.com/apis/console and enter your credit card details.

    var translate = require('../lib/translate')
      , assert = require('assert')

    var key = '<your-secret>';

    // Translate ones string
    translate({key: key, q: 'my test', target: 'fr'}, function(result){
      console.log(result); // prints {"my test": "mon test"}
    });

    // Translate multiple strings
    translate({key: key, q: ['one', 'two'], target: 'fr'}, function(result){
      console.log(result); // prints {"one": "un", "two": "duex"}
    });
