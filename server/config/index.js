const version = require('../package.json').version;
const lodash = require('lodash');
const os = require('os');
const ct = require('../common/const');
const config = {

    version: version,
    NODE_ENV: process.env.NODE_ENV,
    numCPUs: os.cpus().length,
    debug: process.env.NODE_ENV === ct.DEV,

    /*
     * server configure
     */
    port: '1985',
    database: {
        db: 'kingwell',
        username: '',
        password: '',
        host: '127.0.0.1',
        port: ''
    }
};
var _config = {};



switch (process.env.NODE_ENV) {
    case ct.DEV:
        _config = lodash.merge(config, require('./dev'));
        break;
    case ct.PROD:
        _config = lodash.merge(config, require('./prod'));
        break;
    default:
        _config = config;
        break;
}

lodash.merge(_config, require('./site'));

module.exports = _config;