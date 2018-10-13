var express = require('express');
var router = express.Router();
const Item = require('../../db/table/db_item');
/* GET home page. */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;


  function getItems() {
    return new Promise(function (resolve, reject) {
      Item
        .findById(id)
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
      res.renderPage('item', {
        //title: 'Express',
        item: JSON.parse(JSON.stringify(data[0]))
      });
    })
    .catch(function (err) {
      next(err);
    });
});

module.exports = router;