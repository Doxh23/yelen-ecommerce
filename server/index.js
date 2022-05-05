
//package
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')

//db
const dbconn = require('./db/dbconnect')

//env
const env = process.env

//port
let port = env.PORT || 5000


//routing import
let product = require('./routing/product')

app.use(express.json())  
app.use(cors()) 

app.use('/api/v1',product)
// app.use('/api/v1',user)
// app.use('/api/v1',order)
// app.use('/api/v1',payment)


process.setMaxListeners(0)
dbconn(env.MONGO_URI,port,app)