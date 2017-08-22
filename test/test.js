const translate = require('../lib/translate');
const assert = require('assert');
const _ = require('lodash');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

describe('argument parsing', function () {
  it('should throw with no arguments ()', function () {
    assert.throws(translate, /invalid/i);
  });
  it('should throw with just ("text")', function () {
    assert.throws(function () {
      return translate('text');
    }, /need.*target/i);
  });
  it('should throw with just ({})', function () {
    assert.throws(function () {
      return translate({});
    }, /need.*text/i);
  });
  it('should throw with just ({text})', function () {
    assert.throws(function () {
      return translate({ text: 'text' });
    }, /need.*target/i);
  });
  it('should be ok with ("text", "fr")', function () {
    assert.ok(translate('text', 'fr'));
  });
  it('should be ok with ({text, target})', function () {
    assert.ok(translate({ text: 'text', target: 'fr' }));
  });
  it('should be ok with ("text", "fr", cb)', function () {
    assert.ok(translate('text', 'fr', function () {}));
  });
  it('should be ok with ({text, target}, cb)', function () {
    assert.ok(translate({ text: 'text', target: 'fr' }, function () {}));
  });
});

describe('callback', function () {
  it('should callback with ("text", "fr", cb)', function (done) {
    assert.ok(translate('text', 'fr', function () {
      return done();
    }));
  });
  it('should callback with ({text, target}, cb)', function (done) {
    assert.ok(translate({ text: 'text', target: 'fr' }, function () {
      return done();
    }));
  });
});

describe('promise', function () {
  var promise = translate('text', 'fr');
  it('should return a promise', function () {
    assert.equal(_typeof(promise.then), 'function');
    assert.equal(_typeof(promise.catch), 'function');
  });
  it('should call the promise\'s then/catch', function (done) {
    assert.ok(promise.then(function () {
      return done();
    }).catch(function () {
      return done();
    }));
  });
});

describe('translation', function () {
  it('should translate a word "text" =(fr)> "texte"', function (done) {
    translate('text', 'fr').then(function (result) {
      assert.equal(result.toString(), 'texte');
      done();
    }).catch(done);
  });
  it('should translate ("texte", "fr", "en") => "text"', function (done) {
    translate('texte', 'fr', 'en').then(function (result) {
      assert.equal(result.toString(), 'text');
      done();
    }).catch(done);
  });
});
