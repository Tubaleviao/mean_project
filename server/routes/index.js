var express = require("express");
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const controller = require("../controllers/users")
const {auth, script} = require("../middlewares")

var router = express.Router();

router.get("/", (req, res) => {
  res.render("index")
});

router.get("/maps", script, (req, res) => {
  const superagent = require("superagent");
  const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_KEY}`
  superagent.get(url).then(({ text }) => res.send(text));
});

router.post("/signup", async (req, res) => {
  const email_exist = await controller.uniqueEmail(req.body.email);
  if (email_exist) res.json({ message: "This email is already taken!" });

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(req.body.password, salt);

  const new_user = {
    username: req.body.username,
    email: req.body.email,
    password: hashed_password
  };

  const saved_user = await controller.insert(new_user);
  res.json({ success: "The new user is added!", user: saved_user._id });
});

router.post("/signin", async (req, res) => {
  const { error } = signinValidation(req.body);
  if (error) res.json({ ok: false, message: error.details[0].message });

  const { friends, ...user } = await controller.findUser(req.body.username);
  if (!user) res.json({ ok: false, message: "Username Not Found!" });

  const valid_password = await bcrypt.compare(req.body.password, user.password);
  if (!valid_password) res.json({ ok: false, message: "Invalid Password!" });

  const token = jwt.sign({ ...user }, process.env.JWT_KEY);
  res.header("auth-token", token).json({ ok: true, token: token, data: user });
});

const signinValidation = data => {
  const schema = joi.object({
    username: joi
      .string()
      .min(3)
      .required(),
    password: joi
      .string()
      .min(5)
      .required()
  });
  return schema.validate(data);
};


module.exports = router;
