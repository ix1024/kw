const request = require('request');
const __config = require('../__config');
const kwsak = require('kwsak');
var crypto = require('crypto');
var token = 'kingwell';

module.exports = {
    parseBody: function (body, callback, type) {
        body = body || '{}';
        type = type + '==>' || '未知';
        callback = callback || function () { };
        try {
            body = JSON.parse(body);
        } catch (error) {
            kwsak.console.error(error, { showTime: true });
            callback(error, null);
        }

        if (body && body.errcode) {
            kwsak.console.error(type + body.errmsg, { showTime: true });
            return callback(body.errmsg, body);
        }
        kwsak.console.success(body, { showTime: true });
        callback(null, body);
    },
    getJsapiTicket: function (access_token, callback) {
        var url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
        request.get(url, function (err, response) {
            if (err) {
                return callback(err, response);
            }
            _this.parseBody(response.body, function (err, body) {
                callback(err, body);
            });
        }, 'getJsapiTicket');
    },
    /**
     * 微信服务验证
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    wxServerVerify: function (req, res, next) {
        var signature = req.query.signature;
        var timestamp = req.query.timestamp;
        var nonce = req.query.nonce;
        var echostr = req.query.echostr;

        /*  加密/校验流程如下： */
        //1. 将token、timestamp、nonce三个参数进行字典序排序
        var array = new Array(token, timestamp, nonce);
        array.sort();
        var str = array.toString().replace(/,/g, "");

        //2. 将三个参数字符串拼接成一个字符串进行sha1加密
        var sha1Code = crypto.createHash("sha1");
        var code = sha1Code.update(str, 'utf-8').digest("hex");

        //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
        if (code === signature) {
            res.send(echostr)
        } else {
            res.renderData(null, {
                code: '13000',
                //message: '验证出错'
            });
        }
    },
    getCode: function (req, res, next) {
        var _this = this;
        var code = req.query.code;
        var getUrl = function (url) {
            return encodeURIComponent(url);
        }
        if (code) {
            return next();
        }
        var redirect_uri = getUrl('https://tcctw.com/wx');
        var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${__config.appID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
        // return res.send(url);
        res.redirect(url);
    },
    getAccessToken: function (code, callback) {
        var _this = this;
        var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${__config.appID}&secret=${__config.appsecret}&code=${code}&grant_type=authorization_code`;
        callback = callback || function () { };

        request.get(url, function (err, response) {
            if (err) {
                return callback(err, response);
            }
            _this.parseBody(response.body, function (err, body) {
                callback(err, body);
            }, 'getAccessToken');
        });

    },
    getOpenid: function (code, callback) {
        var _this = this;
        var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${__config.appID}&secret=${__config.appsecret}&code=${code}&grant_type=authorization_code`;
        callback = callback || function () { };
        request.get(url, function (err, response) {
            if (err) {
                return callback(err, response);
            }
            _this.parseBody(response.body, function (err, body) {
                callback(err, body);
            }, 'getOpenid');
        });
    },
    getUserinfo: function (access_token, openid, callback) {
        var _this = this;
        var url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
        callback = callback || function () { };
        request.get(url, function (err, response) {
            if (err) {
                return callback(err, response);
            }
            _this.parseBody(response.body, function (err, data) {
                callback(err, data);
            }, 'getUserinfo');
        });
    },
    getToken: function (req, callback) {
        var _this = this;
        var callback = callback || function () { };
        var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${__config.appID}&secret=${__config.appsecret}`;


        if (req.session.token) {
            callback(null, req.session.token);
        } else {
            request.get(url, function (err, response) {
                _this.parseBody(response.body, function (err, data) {
                    if (err) {
                        return callback(err, null);
                    }
                    if (data.access_token) {
                        req.session.token = data.access_token;
                        callback(null, data.access_token);
                    } else {
                        callback('获取Token错误', null);
                    }

                }, 'getToken');

            });
        }
    }
}

