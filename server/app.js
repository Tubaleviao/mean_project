var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {database} = require('./middleware')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(database)

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(err, req, res, next) {
  if(err) res.json({msg: "error", error: err});
  else next();
});

module.exports = app;
