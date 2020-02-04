var express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");
const controller = require("../controllers/users");

const { auth } = require("../middlewares");

var router = express.Router();

router.get("/", auth, async (req, res) => {
  const users = await controller.getUsers();
  res.json(users.map(obj => obj.username));
});

router.get("/search", auth, async (req, res) =>
  res.json(
    req.query._q ? await controller.findMatchingUsers(req.me, req.query._q) : []
  )
);

router.get("/:username", async (req, res) => {
  res.json({ ...(await controller.findUser(req.params.username)) });
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

  const user = await controller.findUser(req.body.username);
  if (!user) res.json({ ok: false, message: "Username Not Found!" });

  const valid_password = await bcrypt.compare(req.body.password, user.password);
  if (!valid_password) res.json({ ok: false, message: "Invalid Password!" });

  const token = jwt.sign({ ...user }, process.env.JWT_KEY);
  res.header("auth-token", token).json({ ok: true, token: token, data: user });
});

router.get("/unique", async (req, res) => {
  const exists = await controller.uniqueEmail(req.query.email);
  res.json({ success: exists ? true : false });
});

router.patch("/change-username", auth, async (req, res) => {
  const changed = await controller.changeUsername(
    req.body.username,
    req.body.newUsername
  );
  res.json({ success: changed ? true : false });
});

router.patch("/change-email", auth, async (req, res) => {
  const changed = await controller.changeEmail(
    req.body.username,
    req.body.newEmail
  );
  res.json({ success: changed ? true : false });
});

router.post("/:id/friends/", auth, async (req, res) => {
  const added = await controller.addFriend(req.body.me, req.body.friend);
  res.json({ success: added ? true : false });
});

// To verify if the user has the friend already or not
router.get("/:id/friends/:friendId", auth, async (req, res) => {
  // const added = await controller.addFriend(req.body.me, req.body.friend);
  // res.json({ success: added ? true : false });
});

router.patch("/update-email", async (req, res) => {});

router.delete("/remove/:username", async (req, res) => {
  res.json({
    success: (await controller.del(req.params.username)) ? true : false
  });
});

const signupValidation = data => {
  const schema = joi.object({
    username: joi
      .string()
      .min(3)
      .required(),
    email: joi
      .string()
      .min(4)
      .required()
      .email(),
    password: joi
      .string()
      .min(5)
      .required()
  });
  return schema.validate(data);
};

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
