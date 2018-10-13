const kwsak = require('kwsak');
const User = require('./table/db_user');
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'table');
const dir = fs.readdirSync(dbPath);
let database = {};

dir.forEach(function (item, index) {
    var name = item.slice(3, -3);
    kwsak.console.success('创建表' + name, {
        clear: true
    });
    database[name] = require(path.join(dbPath, item));
});

//console.log(database);

// User
//     .find()
//     .then(function (result) {
//         console.log(result);

//     })
//     .catch(function (err) {
//         console.log(err);
//     });

const db = function (name, options, callback) {
    const db = database[name];
    for (var key in options) {
        console.log(key, options[key]);

        db[key](options[key], function (err, restult) {
            callback(err, restult);
        });
    }
    //    db.then(callback)
};
db('user', {
    find: {},
    limit: 0
}, function (err, rs) {
    console.log(rs);

})