var express = require('express');
var router = express.Router();
const Item = require('../../db/table/db_item');
const site = require('../../config/site');
/**
 * 获取所有文章列表
 */
router.get('/', function (req, res, next) {

    let pageIndex = req.query.pageIndex || site.page.index;
    let pageSize = req.query.pageSize || site.page.size;



    Item
        .find()
        .skip(pageIndex)
        .limit(pageSize)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            next(err);
        });

});

/**
 * 获取某一条文章
 */
router.get('/:id', function (req, res, next) {

    Item
        .findById(req.params.id)
        .then(function (result) {
            res.send(result);
        });

});

/**
 * 添加一条数据
 */
router.post('/', function (req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    //return res.send(req.body);
    if (!title || !content) {
        return res.send('参数不能为空');
    }
    var item = new Item({
        title: title,
        content: content
    });
    item.save(function (err, result) {
        res.send(result);
    });

});
/**
 * 修改某条数据
 */
router.put('/:id', function (req, res, next) {
    let id = req.params.id;
    let title = req.body.title;
    let content = req.body.content;
    Item.update({
        _id: id
    }, {
        $set: {
            title: title,
            content: content
        }
    }, {
        multi: true
    }, function (err, result) {
        res.send(result);
    });

});
/**
 * 删除某条数据
 */
router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    //res.send({});
    Item.remove({
        _id: id
    }, function (err, result) {
        if (err) {
            return next(err);
        }
        res.send(result);
    });

});

module.exports = router;