var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var uploadPath = '../uplodads';
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({});
});

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

        if (ARray.inArray(mimetype, fileType) !== -1) {
            c(null, true);
        } else {
            c(null, false);
        }
    },
    dest: path.join(__dirname, uploadPath)
});
var uploads = upload.any();

/* GET home page. */
router.post('/', upload.any(), function (req, res, next) {
    uploads(req, res, function () {
        res.send(req.files);
    });

});

module.exports = router;