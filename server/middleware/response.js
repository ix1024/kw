const lodash = require('lodash');
const site = require('../config/site');
const errorCode = require('../common/error-code');
const kwsak = require('kwsak');

var __strimHtml = function (str) {
    var reg = /<(?:.|\s)*?>/ig;
    return str.replace(reg, '');
};
/**
 * 截取字符串
 * @param  {[type]} str    [description]
 * @param  {[type]} length [description]
 * @param  {[type]} symbol [description]
 * @return {[type]}        [description]
 */
var __slice = function (str, length, symbol) {
    var result = '',
        sym = undefined === symbol ? '...' : symbol;

    if (!str || typeof str !== 'string' || !length) {
        result = str;
    } else {
        if (str.length < length) {
            sym = '';
        }
        result = str.slice(0, length) + sym;
    }

    return result;
};
const renderData = function (data, options) {
    options = options || {};
    let code = options.code || '00000';
    let ops = lodash.merge({
        code: code,
        data: data === undefined ? null : data,
        message: errorCode[code] || null,
        timestamp: Date.now()
    }, options);
    this.send(ops);
};

const renderPage = function (name, options) {
    let ops = lodash.merge({
        myDate: function (arg) {
            return new kwsak.MyDate(arg);
        },
        strimHtml: __strimHtml,
        slice: __slice
    }, site, options);
    this.render(name, ops);
};
module.exports = function (req, res, next) {
    res.renderPage = renderPage.bind(res);
    res.renderData = renderData.bind(res);
    next();
};