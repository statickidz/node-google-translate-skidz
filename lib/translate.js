"use strict";

const _ = require('lodash');
const request = require('request-promise');

module.exports = function() {
  let opts, text, sourceLang, targetLang, callback;
  const args = [].slice.call(arguments);
  if (_.isPlainObject(args[0])) {
    opts = args[0];
    text = opts.text;
    sourceLang = opts.source || opts.src || opts.sl || opts.sourceLang;
    targetLang = opts.target || opts.tgt || opts.tl || opts.targetLang;
    callback = args[1];
  } else if (_.isString(args[0])) {
    text = args[0];
    if (_.isString(args[1])) {
      if (_.isString(args[2])) {
        sourceLang = args[1];
        targetLang = args[2];
        callback = args[3]
      } else {
        sourceLang = 'auto';
        targetLang = args[1];
        callback = args[2]
      }
    }
  } else {
    throw new Error('Invalid arguments');
  }

  if (!text) {
    throw new Error('Need a text to translate');
  }
  if (!targetLang) {
    throw new Error('Need a targetLang to translate to');
  }
  callback = _.isFunction(callback) ? callback : _.noop;

  const url = "https://translate.google.com/translate_a/single"
    + "?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=es-ES&ie=UTF-8"
    + "&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e";

  const data = {
    'sl': sourceLang,
    'tl': targetLang,
    'q': text,
  };

  return request({
    method: 'POST',
    uri: url,
    encoding: 'UTF-8',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'User-Agent': 'AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1',
    },
    form: data,
    json: true,
  }).then(function(json) {

    function Translation(json) {
      Object.assign(this, json);
      this.translation = this.sentences.reduce((combined, trans) => combined + (trans.trans || ''), '');
    }
    Translation.prototype.toString = function() {
      return this.translation;
    }

    const translation = new Translation(json);

    callback(translation);
    return translation;

  }).catch(function(err) {
    const newError = new Error('Couldn\'t retrieve a valid JSON response. Perhaps the API has changed, please let us know.');
    newError.data = data;
    newError.statusCode = err.statusCode;
    newError.url = url;
    newError.body = err.error;
    callback(newError);
    throw newError;
  });
};
