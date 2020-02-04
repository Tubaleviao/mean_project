const MongoClient = require("mongodb").MongoClient;
const bcrypt = require('bcrypt')

const conf = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient(process.env.DB_HOST, conf);
let db;

client.connect(err => {
  if (err) throw err;
  db = client.db("project").collection("users");
});

const uniqueEmail = async email => await db.findOne({ email });
const insert = async new_user => await db.insertOne(new_user);
const findUser = async username => await db.findOne({ username });
const del = async username => await db.deleteOne({ username });
const getUsers = async () =>
  await db
    .find()
    .project({ _id: 0, username: 1 })
    .toArray();
const saveLocation = (username, location) =>
  db.findOneAndUpdate({ username }, { $set: { location } });
const findMatchingUsers = criteria =>
  db
    .find({
      $or: [{ username: { $regex: criteria } }, { email: { $regex: criteria } }]
    })
    .project({ password: 0 })
    .sort({ username: 1 })
    .toArray();

const changeUsername = async (username, newUsername) => {
    return await db.updateOne({ username }, { $set: {username: newUsername } });
}

const changeEmail = async (username, newEmail) => {
    return await db.updateOne({ username }, { $set: { email: newEmail } })
}

const changePassword = async (username, newPassword) => {
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);
    return await db.updateOne({ username }, { $set: { password: newHashedPassword } })
}

const addFriend = async (username, friend) => {
  return await db.updateOne({ username }, { $push: { friends: friend } });
};

  findMatchingUsers,
  getUsers,
  saveLocation,
  uniqueEmail,
  insert,
  findUser,
  addFriend,
  del,
  changeUsername,
  changeEmail
};
