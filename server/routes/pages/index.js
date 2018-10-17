const express = require('express');
const router = express.Router();
const Item = require('../../db/table/db_item');
const site = require('../../config/site');
const weixin = require('../../common/weixin');
const kwsak = require('kwsak');

router.all('/wx', function (req, res, next) {
  var code = req.query.code;

  var render = function () {
    kwsak.console.success(req.session.wxData);
    res.renderPage('user/index.html', {
      wxData: req.session.wxData
    });
  };

  if (!code) {
    return weixin.getCode(req, res, next);
  }
  if (req.session.wxData && req.session.wxData.openid) {
    return render();
  }

  Promise.resolve()
    .then(function () {
      return weixin.getAccessToken(code);
    })
    .then(function (data) {
      return weixin.getUserinfo(data.access_token, data.openid);
    })
    .then(function (data) {
      req.session.wxData = data;
      render();
    })
    .catch(function (err) {
      console.log(err);
      switch (err.errcode) {
        case 40163:
          res.redirect('/getUserinfo');
          break;
        default:
          next({ message: errmsg });
          break;
      }

    });

});
//router.get('*', weixin.wxServerVerify);
//router.get('*', weixin.getToken);
router.get('/getUserInfo', weixin.getCode);

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