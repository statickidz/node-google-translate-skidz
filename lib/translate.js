var request = require('request'),
    _ = require('underscore'),
    querystring = require('querystring')

module.exports = function(opts, callback) {
    opts = _.defaults(opts, {
        q: 'text',
        source: 'en',
        target: 'es'
    });

    var url = 'https://translate.google.com/translate_a/single?client=t&'
                + 'sl=' + querystring.escape(opts.source)
                + '&tl=' + querystring.escape(opts.target)
                + '&hl=' + querystring.escape(opts.target)
                + '-419&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t'
                + '&dt=at&ie=UTF-8&oe=UTF-8&otf=1&ssel=0&tsel=0&tk=519235|682612'
                + '&q=' + querystring.escape(opts.q);

    request.get(url, function(err, response, body) {

        var res = body;

        res = res.replace(/\[/g,'');
        res = res.replace(/\]/g,'');

        var trans = res.split('"');
        trans.splice(0, 1);
        trans.splice(trans.length - 6, trans.length);

        var step = 0;
        var result = '';
        do {
            result += trans[step];
            step = step + 4;
        } while(step < trans.length);
        
        callback(result);
    });
};