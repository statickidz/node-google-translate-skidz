const translate = require('../lib/translate');
const assert = require('assert');
const _ = require('lodash');

describe('argument parsing', () => {
  it('should throw with no arguments ()', () => {
    assert.throws(translate, /invalid/i);
  });
  it('should throw with just ("text")', () => {
    assert.throws(() => translate('text'), /need.*target/i);
  });
  it('should throw with just ({})', () => {
    assert.throws(() => translate({}), /need.*text/i);
  });
  it('should throw with just ({text})', () => {
    assert.throws(() => translate({ text: 'text' }), /need.*target/i);
  });
  it('should be ok with ("text", "fr")', () => {
    assert.ok(translate('text', 'fr'));
  });
  it('should be ok with ({text, target})', () => {
    assert.ok(translate({ text: 'text', target: 'fr' }));
  });
  it('should be ok with ("text", "fr", cb)', () => {
    assert.ok(translate('text', 'fr', () => {}));
  });
  it('should be ok with ({text, target}, cb)', () => {
    assert.ok(translate({ text: 'text', target: 'fr' }, () => {}));
  });
});

describe('callback', () => {
  it('should callback with ("text", "fr", cb)', (done) => {
    assert.ok(translate('text', 'fr', () => done()));
  });
  it('should callback with ({text, target}, cb)', (done) => {
    assert.ok(translate({ text: 'text', target: 'fr' }, () => done()));
  });
});

describe('promise', () => {
  const promise = translate('text', 'fr');
  it('should return a promise', () => {
    assert.equal(typeof promise.then, 'function');
    assert.equal(typeof promise.catch, 'function');
  });
  it('should call the promise\'s then/catch', (done) => {
    assert.ok(promise.then(() => done()).catch(() => done()));
  });
});

describe('translation', () => {
  it('should translate a word "text" =(fr)> "texte"', (done) => {
    translate('text', 'fr').then(result => {
      assert.equal(result.toString(), 'texte');
      done();
    }).catch(done);
  });
  it('should translate ("texte", "fr", "en") => "text"', (done) => {
    translate('texte', 'fr', 'en').then(result => {
      assert.equal(result.toString(), 'text');
      done();
    }).catch(done);
  });
});
