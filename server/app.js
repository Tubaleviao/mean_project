require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())


// app.use(router) // create routes

app.listen(3000)