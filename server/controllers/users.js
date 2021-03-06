const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const conf = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient(process.env.DB_HOST, conf);
let db;

client.connect(err => {
  if (err) console.log(err);
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

const findMatchingUsers = (currentUser, criteria) =>
  db
    .find({
      $or: [
        { username: { $regex: criteria } },
        { email: { $regex: criteria } }
      ],
      _id: { $ne: mongodb.ObjectId(currentUser._id) }
    })
    .project({ password: 0, friends: 0 })
    .sort({ username: 1 })
    .toArray();

const changeUsername = async (username, newUsername) => {
  return await db.updateOne({ username }, { $set: { username: newUsername } });
};

const changeEmail = async (username, newEmail) => {
  return await db.updateOne({ username }, { $set: { email: newEmail } });
};

const changePassword = async (username, newPassword) => {
  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);

  return await db.updateOne(
    { username },
    { $set: { password: newHashedPassword } }
  );
};

const addFriend = async (currentUser, friend) => {
  return await db.updateOne(
    { _id: mongodb.ObjectId(currentUser._id) },
    { $addToSet: { friends: friend.username } } // ...friend, _id: mongodb.ObjectId(friend._id)
  );
};

const removeFriend = async (currentUserId, friend) => {
  const res = await db.updateOne(
    { _id: mongodb.ObjectId(currentUserId) },
    {
      $pull: { friends: friend }
    }
  );

  return res.modifiedCount > 0;
};

const getFriends = async currentUser =>
  (await db.findOne({ _id: mongodb.ObjectId(currentUser._id) }, { friends: 1 }))
    .friends || [];

const getFriendsLocation = async friends =>
  await db
    .find({ username: { $in: friends || [] }, location: { $exists: true } })
    .project({ _id: 0, location: 1, username: 1 })
    .toArray();

module.exports = {
  getFriendsLocation,
  findMatchingUsers,
  getUsers,
  getFriends,
  uniqueEmail,
  insert,
  findUser,
  addFriend,
  removeFriend,
  del,
  changeUsername,
  changeEmail
};
