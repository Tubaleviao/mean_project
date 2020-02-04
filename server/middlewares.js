const MongoClient = require("mongodb").MongoClient;
const { verify } = require("jsonwebtoken");

const client = new MongoClient(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db;

const usersCollection = async (req,res,next)=>{
  req.db = req.db.collection('users')
  next()
}

const database = async (req, res, next) => {
  if (!db) {
    const worked = await client.connect();
    db = client.db("project");
  }
  req.db = db;
  next();
};

const auth = (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization.split(" ");
    let json = verify(token, process.env.JWT_KEY);
    req.userinfo = json;
    next();
  } catch (err) {
    next({ msg: "token not valid", error: err });
  }
};

module.exports = { database, auth, usersCollection };
