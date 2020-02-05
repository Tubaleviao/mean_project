var express = require("express");
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
  res.json(await controller.findUser(req.params.username));
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

router.post("/friends/location", async (req, res) => 
  res.json(await controller.getFriendsLocation(req.body))
);

router.delete("/:id/friends/:friendId", async (req, res) => {
  const { id, friendId } = req.params;
  res.json({ success: await controller.removeFriend(id, friendId) });
});

router.patch("/update-email", async (req, res) => {});

router.delete("/remove/:username", async (req, res) => {
  res.json({
    success: (await controller.del(req.params.username)) ? true : false
  });
});

module.exports = router;
