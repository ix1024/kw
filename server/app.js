const kwsak = require('kwsak');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const nunjucks = require('nunjucks');
const ct = require('./common/const');
const pachong = require('./common/pachong');


const config = require('./config');
const response = require('./middleware/response');

const DB_URL = config.database.host + '/' + config.database.db;
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + DB_URL, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', function (err) {
  kwsak.console.error('数据连接出错\n' + err, {
    showTime: true
  });
});
db.once('open', function () {
  // we're connected!
  kwsak.console.success('Database connection succeeded', {
    showTime: true
  });

});




//require('./db');

const app = express();
nunjucks.configure('views', {
  autoescape: true,
  noCache: process.env.NODE_ENV === ct.DEV,
  express: app
});
// view engine setup
//app.set('views', path.join(__dirname, 'views'));



var Store = require('express-session').Store;
var MongooseStore = require('mongoose-express-session')(Store);

app.use(require('express-session')({
  secret: 'kingwell.leng',
  resave: false,
  rolling: false,
  cookie: {
    maxAge: 10000000000
  },
  saveUninitialized: true,
  store: new MongooseStore({
    connection: mongoose /* configuration */
  })
}));






app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(response);

/**
 * Routes
 */
require('./app-routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === ct.DEV ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.renderPage('error');
});

module.exports = app;