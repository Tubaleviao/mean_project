const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const conf = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient(process.env.DB_HOST, conf);
let db

client.connect(err => {
  if (err) console.log(err);
  db = client.db("project").collection("users")
});

const saveLocation = (username, location) => 
    db.findOneAndUpdate({ username }, { $set: { location } });

module.exports = {saveLocation}