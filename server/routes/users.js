var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const {auth} = require('../middlewares')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({msg:"something"})
  // req.db.find({},  { '_id': 0, 'username': 1, 'email': 1 } )
  //       .toArray((err, docs) => {
  //           res.status(200).json(docs);
  //       });
});

// /* GET user, find one. */
router.get("/findOne/:username", (req, res) => {
  const query = { username: req.params.username };
  req.db.collection('users').find(query).toArray((error, document) => {
    if (error) throw error;
    res.send(document);
  });
});



/* POST creating users */
router.post('/create', function(req, res, next){
  req.db.insert({ 'username': req.body.username, 'password': req.body.password, 'email': req.body.email}, (err, data) => {
      res.json({ userId:' _id' })
  });
})

// router.put('/users/:id/update', function(req, res, next){
  
// })

router.delete('/:id/reserve/:reservation_id', function(req, res, next){
  
})

router.get('/jwt', (req,res) => {
  bcrypt.hash('comming_from_req', 10, (err, hash) => {
      var token = jwt.sign({ 
          username: 'user',
          password: hash
      }, process.env.JWT_KEY);
      res.json({token})
  });
})

router.get('/protected', auth, (req,res) => {
  res.json(req.userinfo)
})

module.exports = router;
