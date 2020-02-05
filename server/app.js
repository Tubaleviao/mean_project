require("dotenv").config();
const fs = require("fs");
var express = require("express");
var path = require("path");
const cors = require("cors");
const socketIO = require("socket.io");
const socket = require("./routes/socket");

const {auth} = require("./middlewares")
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
let server;

if (process.env.NODE_ENV === "prod") {
  server = require("https").createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/chocotuba.work/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/chocotuba.work/fullchain.pem"),
      allowHTTP1: true
    },
    app
  );
} else {
  server = require("http").createServer(app);
}

let io = socketIO(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", auth, usersRouter);
app.all("*", (req, res) => res.send("not found"));

app.use((err, req, res, next) => {
  if (err) res.json({ msg: "error", error: err });
  else next();
});

io.on("connection", socket.code);

// this works with socket
server.listen(process.env.PORT, () => console.log(`Resting at ${process.env.PORT}`))

