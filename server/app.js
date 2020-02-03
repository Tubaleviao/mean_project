require('dotenv').config()
var express = require('express');
var path = require('path');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {database} = require('./middlewares')

var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(database)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.all('/', (req,res) => req.statusCode(404).send("not found"))

app.use(function(err, req, res, next) {
  if(err) res.json({msg: "error", error: err});
  else next();
});

module.exports = app;

