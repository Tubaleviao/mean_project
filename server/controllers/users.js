const MongoClient = require("mongodb").MongoClient;

const conf = { useNewUrlParser: true, useUnifiedTopology: true }
const client = new MongoClient(process.env.DB_HOST, conf);
let db;

client.connect(err => {
    if (err) throw err;
    db = client.db('project').collection('users')
});

const uniqueEmail = async email => await db.findOne({ email })
const insert = async new_user => await db.insertOne(new_user)
const findUser = async username => await db.findOne({ username })
const del = async username => await db.deleteOne({ username })
const getUsers = async () => await db.find().project({ _id: 0, username: 1 }).toArray()
const saveLocation = (username, location) => db.findOneAndUpdate({username}, {$set:{location}})

const addFriend = async (username, friend) => {
    return await db.updateOne({ username }, { $push: { friends: friend } });
}



module.exports = {
    getUsers, saveLocation,
    uniqueEmail, insert, findUser, addFriend, del
}