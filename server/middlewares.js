const { verify } = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");
    let json = verify(token, process.env.JWT_KEY);
    req.me = json;
    next();
  } catch (err) {
    next({ msg: "token not valid", error: err });
  }
}

const script = (req, res, next) => {
  res.set('Content-Type', 'text/plain');
  next()
}

module.exports = { auth, script };
