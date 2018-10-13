const fs = require('fs');
const path = require('path');
const kwsak = require('kwsak');
const config = require('./config');


function getFiles(p) {
    var list = [];

    function get(p) {
        fs.readdirSync(p).forEach(function (item, index) {
            var _p = path.join(p, item);
            if (fs.statSync(_p).isFile()) {
                list.push(_p);
            } else if (fs.statSync(_p).isDirectory()) {
                get(_p);
            }
        });
    }
    get(p);
    return list;
}
var reg = RegExp('\\\\', 'ig');
var apiRoutes = ['API routes:'];
var pageRoutes = ['Pages routes:'];

module.exports = function (app) {
    getFiles(path.join(__dirname, './routes/api')).forEach(function (item) {
        let _item = item.replace(process.cwd(), '') || '';
        _item = _item.slice(7, -3);
        _item = _item.replace(reg, '/');
        app.use(_item, require(item));
        apiRoutes.push(_item);
    });
    getFiles(path.join(__dirname, './routes/pages')).forEach(function (item) {
        let _item = item.replace(process.cwd(), '') || '';
        _item = _item.slice(7, -3);
        _item = _item.replace(reg, '/');
        _item = _item.replace('/pages/index', '');
        _item = _item.replace('/pages/', '/');
        _item = _item || '/';
        app.use(_item, require(item));
        pageRoutes.push(_item);
    });
    kwsak.console.info(pageRoutes.join('\n'));
    kwsak.console.info(apiRoutes.join('\n'));

};