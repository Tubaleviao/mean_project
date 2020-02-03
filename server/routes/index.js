var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ title: "Express" });
});

router.get("/maps", (req, res, next) => {
  const superagent = require("superagent");
  superagent
    .get(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_KEY}`
    )
    .then(({ text }) => res.send(text));
});

module.exports = router;
