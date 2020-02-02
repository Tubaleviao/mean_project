const MongoClient = require('mongodb').MongoClient
const {verify} = require('jsonwebtoken');
//VALIDATION package
const joi = require('@hapi/joi');

const client = new MongoClient(process.env.DB_HOST, 
    { useNewUrlParser: true, useUnifiedTopology: true })

    let db

const database = async (req, res, next) => {
    if(!db){
        const worked = await client.connect()
        db = client.db('project')
    }
    req.db = db
    next()
}

const auth = async (req, res, next) => {
    try{
        let json = verify(req.headers.token, process.env.JWT_KEY)  // suggestion.. add await
        req.userinfo = json
        next()
    }catch(err){
        next({msg: "token not valid", error: err})
    }
}

//signup validation
const signupValidation = (data) => {
    const schema = joi.object({
        username: joi.string().min(3).required(),
        email: joi.string().min(4).required().email(),
        password: joi.string().min(5).required(),
    });

  // lets validate data
  return schema.validate(data);
}

module.exports = {database, auth, signupValidation}