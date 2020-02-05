require('dotenv').config()
const fs = require('fs')
let http = require('https');
var express = require('express');
var path = require('path');
const cors = require('cors')
const socketIO = require('socket.io')
const socket = require('./routes/socket')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
let server = http.createServer({key: fs.readFileSync("/etc/letsencrypt/live/chocotuba.work/privkey.pem"), cert: fs.readFileSync("/etc/letsencrypt/live/chocotuba.work/fullchain.pem"), allowHTTP1: true}, app);
let io = socketIO(server);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.all('*', (req, res) => req.statusCode(404).send("not found"))

app.use( (err, req, res, next) => {
  if (err) res.json({ msg: "error", error: err });
  else next();
});

io.on('connection', socket.code);

// this works with socket
server.listen(process.env.PORT, () => console.log(`Resting at ${process.env.PORT}`))

