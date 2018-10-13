const express = require('express');
const router = express.Router();
const Item = require('../../db/table/db_item');
const site = require('../../config/site');

/* GET home page. */
router.get('/', function (req, res, next) {
    let query = new RegExp(req.query.keyword, 'ig');
    let pageIndex = req.query.pageIndex || site.page.index;
    let pageSize = req.query.pageSize || site.page.size;

    function getItems() {
        return new Promise(function (resolve, reject) {
            Item
                .find({
                    'name': {
                        $regex: query
                    }
                })
                .skip(pageIndex)
                .limit(pageSize)
                .then(resolve)
                .catch(reject);
        });
    }
    Promise
        .all([
            getItems()
        ])
        .then(function (data) {
            //return res.renderData(data);
            res.renderPage('search', {
                //title: 'Express',
                items: JSON.parse(JSON.stringify(data[0]))
            });
        })
        .catch(function (err) {
            next(err);
        });

});

module.exports = router;