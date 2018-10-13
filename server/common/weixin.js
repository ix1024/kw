const request = require('request');
const __config = require('../__config');
const kwsak = require('kwsak');

module.exports = {
    getToken: function (req, res, next) {

        var url = `https://api.weixin.qq.com/cgi-bin/token?
                   grant_type=client_credential&
                   appid=${__config.appID}&
                   secret=${__config.appsecret}`;

        if (!req.session.token) {
            request(url, function (err, response) {

                if (err) {
                    return next(err);
                }
                res.send(response);
            });
        } else {
            next();
        }
    }
}

