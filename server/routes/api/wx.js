
var express = require('express');
var router = express.Router();
router.get('/s', function (req, res) {
    res.renderData(req.session);
});
router.get('/get-userinfo', function (req, res, next) {
    res.send({ code: req.query.code });
});

router.post('/', function (req, res, next) {
    res.send({});
});

router.put('/', function (req, res, next) {
    res.send({});
});

router.delete('/', function (req, res, next) {
    res.send({});
});

module.exports = router;

