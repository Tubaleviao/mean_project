const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const conf = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient(process.env.DB_HOST, conf);

const p = new Promise((res, rej) => {
    client.connect(err => {
        if (err) rej(err);
        res(client.db("project").collection("users"))
    });
})


module.exports = p