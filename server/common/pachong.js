const request = require('request');
const cheerio = require('cheerio');
const Item = require('../db/table/db_item');
const ct = require('./const');

// Item.find().then(function (result) {
//     console.log(result);
// });
// request('https://juejin.im/post/5badd0c5e51d450e4437f07a', function (err, response) {

//     var $ = cheerio.load(response.body);
//     //return;
//     var item = new Item({
//         title: $('.article-title').text(),
//         content: $('.article-content').html()
//     });
//     item.save(function (err, result) {
//         console.log(err, result);

//     });

// });