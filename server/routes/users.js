var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { auth, signupValidation } = require('../middlewares')
var router = express.Router();

/* GET: users listing. */
router.get('/', function(req, res, next) {
  //res.json({msg:"something"})
  req.db.collection('users').find({},  { '_id': 0, 'username': 1, 'email': 1 } )
        .toArray((err, documents) => {
            res.status(200).json(documents);
        });
});

/* GET: user, find one. */
router.get("/:username", (req, res) => {
  const query = { username: req.params.username };
  req.db.collection('users').find(query).toArray((error, document) => {
    if (error) throw error;
    res.send(document);
  });
});

/* POST: signup users */
router.post('/signup', async function(req, res, next){
  // checking validation
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).json({message: error.details[0].message});

  // check if the user is already in database
  const email_exist = await req.db.collection('users').findOne({ email: req.body.email });
  if (email_exist) return res.status(400).json({message :"This email is already taken!"});

  // hash the passwords
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(req.body.password, salt);

  // create new user
  const new_user = {
    username: req.body.name,
    email: req.body.email,
    password: hashed_password
  };

  try {
    const saved_user = await req.db.collection('users').insertOne(new_user);
    res.json({ success: "The new user is added!", user: saved_user._id });
  } catch (err) {
      res.status({message:err.message}); // res.status({message:'Error Occured'});
  }
})

/* POST: signin users */
router.post('/signin', async function(req, res, next){
  
})

/* PUT: update users */
router.put('/update/:id/', function(req, res, next){
  
})

router.delete('/remove/:username', function(req, res, next){
  const query = { course: req.params.username };
  collection.deleteOne(query);
  res.send(`User successfully deleted`);
})
  
router.get('/jwt', (req,res) => {
  bcrypt.hash('password_comming_from_req', 10, (err, hash) => {
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
