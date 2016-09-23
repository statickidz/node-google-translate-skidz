var request = require("request"),
    _ = require("underscore"),
    querystring = require("querystring");

module.exports = function(opts, callback) {
    opts = _.defaults(opts, {
        text: "text",
        source: "en",
        target: "es"
    });

    var url = "https://translate.google.com/translate_a/single"
                + "?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=es-ES&ie=UTF-8"
                + "&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e";
    var data = {
        "sl": querystring.escape(opts.source),
        "tl": querystring.escape(opts.target),
        "q": opts.text
    };

    request.post({
        uri: url,
        encoding: "UTF-8",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "User-Agent": "AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1",
        },
        body: querystring.stringify(data)
    }, function(error, response, body) {
        var json = JSON.parse(body);
        var sentences = json.sentences;
        var translation = "";
        for(var i=0; i<sentences.length; i++) {
            translation += sentences[i].trans;
        }
        callback(translation);
    });
};