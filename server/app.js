require('dotenv').config()
let http = require('http');
var express = require('express');
var path = require('path');
const cors = require('cors')
const socketIO = require('socket.io')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {database} = require('./middlewares')

var app = express();
let server = http.createServer(app);
let io = socketIO(server);

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

io.on('connection', socket => {
  console.log('user connected');
  socket.on('new-message', message => {
    console.log(message);
    // { lng: -91.9590777, lat: 41.013430500000005 }
    socket.emit('new-message', message)
    // TODO: save location at the database
  });
});

// this works with socket
server.listen(3000, ()=>console.log("Resting at 3000"))

