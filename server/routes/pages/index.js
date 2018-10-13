const express = require('express');
const router = express.Router();
const Item = require('../../db/table/db_item');
const site = require('../../config/site');
const weixin = require('../../common/weixin');


router.get('*', weixin.getToken);

/* GET home page. */
router.get('/', function (req, res, next) {

  let pageIndex = req.query.pageIndex || site.page.index;
  let pageSize = req.query.pageSize || site.page.size;

  function getItems() {
    return new Promise(function (resolve, reject) {
      Item
        .find()
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
      //res.renderData(data);
      res.renderPage('index', {
        //title: 'Express',
        items: JSON.parse(JSON.stringify(data[0]))
      });
    })
    .catch(function (err) {
      next(err);
    });

});

module.exports = router;