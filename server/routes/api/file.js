var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var path = require('path');
var multer = require('multer');
var kwsak = require('kwsak');
var uploadPath = '../../../uploads/';

var getFileType = function (str) {
    return {
        'vnd.ms-excel': 'xls',
        'javascript': 'js'
    }[str] || str;
};
var fileType = [
    'application/pdf',
    'application/javascript',
    'image/png',
    'image/gif',
    'image/jpeg',
    'application/x-zip-compressed',
    'application/vnd.ms-excel',
    'video/mp4'
];

var upload = multer({
    limits: {
        fieldNameSize: 100, //field 名字最大长度
        fieldSize: 100, //field 值的最大长度
        files: 5, //fileSize:1024 * 1024,
    },
    // filename: function(req, file, cb) {
    // 	console.log(1023);
    // 	cb(null, file.fieldname + '-' + Date.now());
    // },
    fileFilter: function (req, file, c) {

        var mimetype = file.mimetype;

        if (kwsak.inArray(mimetype, fileType) !== -1) {
            c(null, true);
        } else {
            c(null, false);
        }
    },
    dest: path.join(__dirname, uploadPath)
});



router.post('/upload', function (req, res, next) {
    var data = '';
     console.log(1,req.files);
    // req.on('data', function (chunk) {    	
    // 	data += chunk;
    // });
    // req.on('end', function () {
    // 	console.log(data);
    // 	res.send(data);
    // });
    //return;
    var uploads = upload.any();
    uploads(req, res, function (err) {
        if (err) {
            kwsak.console.error(err);
            res.send(err);
        } else {
            console.log(2,req.files);
            if (!req.files) {
                return res.renderData(null, { code: '13010' });
            }
            var obj = req.files.map(function (item) {
                kwsak.console.info(item);
                delete item.destination;
                delete item.path;
                item.url = (req.headers.origin || req.headers.host) +
                    req.baseUrl +
                    '/' +
                    item.filename +
                    '.' +
                    getFileType(item.mimetype.split('/')[1]);
                return item;
            });
            kwsak.console.info('req.files', req.files, obj);
            if (req.query && req.query.dir === 'image') {
                //return res.send(obj);
                res.send({
                    error: 0,
                    url: obj[0] ? obj[0].url : ''
                });
            } else if (req.query && req.query.editorid === 'editor') {
                //res.send('https://www.tcctw.com/api/file/2d1295d0be7d36caddfc46a88389db9b.png');
            } else {
                res.renderData(obj);
            }

        }
    });
});



router.get('/:filename', function (req, res, next) {
    var id = req.params.filename;
    var realPath = path.join(__dirname, uploadPath + id);
    var _mime = mime.lookup(realPath);
    var lastIndexOf = realPath.lastIndexOf('.');
    realPath = realPath.slice(0, lastIndexOf);

    fs.stat(realPath, function (err, stat) {
        if (err) {
            kwsak.console.error(err);
            next();
            //res.send(err);
        } else {
            if (stat.isFile()) {
                var stream = fs.createReadStream(realPath);
                res.setHeader("Content-Type", _mime);
                stream.pipe(res);
            } else {
                next();
                //res.send({});
            }
        }
    });
});


module.exports = router;