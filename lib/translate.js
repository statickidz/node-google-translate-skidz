var request = require("request"),
    _ = require("underscore"),
    striptags = require("striptags"),
    querystring = require("querystring"),
    entities = require("entities");

module.exports = function(opts, callback) {
    opts = _.defaults(opts, {
        text: "text",
        source: "en",
        target: "es"
    });

    var url = "https://translate.google.com/";
    var data = {
        "sl": querystring.escape(opts.source),
        "tl": querystring.escape(opts.target),
        "js": querystring.escape("n"),
        "prev": querystring.escape("_t"),
        "hl": querystring.escape("es"),
        "ie": querystring.escape("UTF-8"),
        "text": opts.text,
        "file": querystring.escape(""),
        "edit-text": querystring.escape("")
    };

    request.post({
        uri: url,
        encoding: "UTF-8",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) " +
                "Gecko/20080311 Firefox/2.0.0.13')",
        },
        body: querystring.stringify(data)
    }, function(error, response, body) {
        var matches = body.match(/\<span id=result_box(.*?)\<\/span><\/div>/g);
        var translation = matches[0];
        translation = entities.decode(translation);
        translation = striptags(translation);

        /*var $ = cheerio.load(body);
        var translation = $("#result_box").text();*/

        callback(translation);
    });
};