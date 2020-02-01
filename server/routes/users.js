var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.json({msg:"something"})
  req.db.find({},  { '_id': 0, 'username': 1, 'email': 1 } )
        .toArray((err, documents) => {
            res.status(200).json(documents);
        });
});

/* GET user, find one. */
router.get("/:username", (req, res) => {
  const query = { username: req.params.username };
  req.db.collection('users').find(query).toArray((error, document) => {
    if (error) throw error;
    res.send(document);
  });
});

/* POST creating users */
router.post('/create', function(req, res, next){
  var new_user = req.body;
  req.db.insertOne( new_user, (err, user_inserted) => {
    if(error) throw error;
    res.end("Congratulations, user successfully added \n" + user_inserted);
  });
})

router.put('/update/:id/', function(req, res, next){
  
})

router.delete('/remove/:username', function(req, res, next){
  const query = { course: req.params.username };
  collection.deleteOne(query);
  res.send(`User successfully deleted`);
})

module.exports = router;
