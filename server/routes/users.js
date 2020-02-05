var express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");
const controller = require("../controllers/users");

var router = express.Router();

router.get("/", async (req, res) => {
  const users = await controller.getUsers();
  res.json(users.map(obj => obj.username));
});

router.get("/search", async (req, res) =>
  res.json(
    req.query._q ? await controller.findMatchingUsers(req.me, req.query._q) : []
  )
);

router.get("/:username", async (req, res) => {
  res.json({ ...(await controller.findUser(req.params.username)) });
});

router.get("/unique", async (req, res) => {
  const exists = await controller.uniqueEmail(req.query.email);
  res.json({ success: exists ? true : false });
});

router.patch("/change-username", async (req, res) => {
  const changed = await controller.changeUsername(
    req.body.username,
    req.body.newUsername
  );
  res.json({ success: changed ? true : false });
});

router.patch("/change-password", async (req, res) => {
  const changed = await controller.changePassword(
    req.body.username,
    req.body.newPassword
  );
  res.json({ success: changed ? true : false });
});

router.patch("/change-email", async (req, res) => {
  const changed = await controller.changeEmail(
    req.body.username,
    req.body.newEmail
  );
  res.json({ success: changed ? true : false });
});

router.post("/:id/friends/", async (req, res) => {
  const added = await controller.addFriend(req.me, req.body);
  res.json({ success: added ? true : false });
});

router.get("/:id/friends/", async (req, res) =>
  res.json(await controller.getFriends(req.me))
);

// To verify if the user has the friend already or not
router.get("/:id/friends/:friend", async (req, res) => {
  // const added = await controller.addFriend(req.body.me, req.body.friend);
  // res.json({ success: added ? true : false });
});

router.patch("/update-email", async (req, res) => {});

router.delete("/remove/:username", async (req, res) => {
  res.json({
    success: (await controller.del(req.params.username)) ? true : false
  });
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
