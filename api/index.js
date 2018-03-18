// Packages
require('dotenv').config()
require("babel-register");
const express      = require('express')
const app          = express()
const cors         = require('cors')
const bodyParser   = require('body-parser')

const envWarning = require('./misc/envWarning')
const connectToDatabase = require('./db/connectToDatabase')
const initializeRoutes = require('./routes')

envWarning()
connectToDatabase()

app.use(cors())
app.use(bodyParser.json())

initializeRoutes(app)

const port = 3000
app.listen(port, () => {
  console.log('api running on ', port);
});