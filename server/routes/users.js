var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const joi = require('@hapi/joi');
const controller = require('../controllers/users')

const { auth } = require('../middlewares')

var router = express.Router();

router.get('/', async (req, res) => {
  const users = await controller.getUsers(req.db)
  res.json(users.map(obj => obj.username))
});

router.get("/:username", (req, res) => {
  const query = { username: req.params.username };
  req.db
    .collection("users")
    .find(query)
    .toArray((error, document) => {
      if (error) throw error;
      res.send(document);
    });
});

router.post('/signup', async function (req, res) {
  const email_exist = await req.db.findOne({ email: req.body.email });
  if (email_exist) return res.status(400).json({ message: "This email is already taken!" });

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(req.body.password, salt);

  const new_user = {
    username: req.body.username,
    email: req.body.email,
    password: hashed_password
  };

  try {
    const saved_user = await req.db.collection("users").insertOne(new_user);
    res.json({ success: "The new user is added!", user: saved_user._id });
  } catch (err) {
    res.status({ message: err.message });
  }
});

/* POST: signin users */
router.post('/signin', async function (req, res) {

  const { error } = signinValidation(req.body);
  if (error) res.json({ ok: false, message: error.details[0].message });

  const user = await req.db.collection('users').findOne({ username: req.body.username });
  if (!user) res.json({ ok: false, message: "Username Not Found!" });

  const valid_password = await bcrypt.compare(req.body.password, user.password);
  if (!valid_password) res.json({ ok: false, message: 'Invalid Password!' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
  res.header('auth-token', token).json({ ok: true, token: token, user_id: user._id, api_token: process.env.GOOGLE_KEY });
});

router.get('/unique', async function (req, res) {
  req.db.collection('users').findOne({ email: req.query.email }, (err, doc) => {

    if (err) res.json({ msg: "Unique routes error: " + err });
    else if (!!doc) res.json({ success: true });
    else res.json({ success: false });
  });
});

/* PATCH: add friends to users */
router.patch('/add-friend', auth, async function (req, res) {
  req.db.collection('users').updateOne(
    { 'username': req.body.me },
    { $push: { friends: req.body.friend } },
    (err, data) => {
      if (err) {
        res.json({ success: false, 'message': 'Friend not added! Error: ' + err });
      } else {
        res.json({ success: true, 'message': `Your friend, ${req.body.friend} is added to your friends list!` });
      }
    });
});

router.delete('/remove/:username', function (req, res) {
  const query = { course: req.params.username };
  collection.deleteOne(query);
  res.send(`User successfully deleted`);
})

router.get('/jwt', (req, res) => {
  bcrypt.hash('password_comming_from_req', 10, (err, hash) => {
    var token = jwt.sign({
      username: 'user',
      password: hash
    }, process.env.JWT_KEY);
    res.json({ token })
  });
});

router.get('/protected', auth, (req, res) => {
  res.json(req.userinfo)
})

// SIGNUP Validation
const signupValidation = data => {
  const schema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().min(4).required().email(),
    password: joi.string().min(5).required(),
  });
  // validate data
  return schema.validate(data);
};

// SIGNIN Validation
const signinValidation = data => {
  const schema = joi.object({
    username: joi.string().min(3).required(),
    password: joi.string().min(5).required(),
  });
  // validate data
  return schema.validate(data);
};

module.exports = router;
