const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const conf = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient(process.env.DB_HOST, conf);
let db;

client.connect(err => {
    if (err) throw err;
    db = client.db("project").collection("users");
});

module.exports = db