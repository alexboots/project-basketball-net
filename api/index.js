require('dotenv').config()
const express      = require('express')
const app          = express()
const cors         = require('cors')
const MongoClient  = require('mongodb').MongoClient
const bodyParser   = require('body-parser')

if(!process.env.envFileExists) {
  console.log("!!! The .env file does not exist");
  console.log("Please rename .env.development to .env")
  console.log("Or ping  @alexboots and ask for it :)");
}

const dbuser = process.env.dbuser
const dbpass = process.env.dbpass
const port = process.env.port

app.use(cors())

app.get('/api/request/:id', (req, res) => {
  console.log('req', req.params.id);
   res.send('sup');
});

app.post('/request', (req, res) => {
  // You'll create your note here.
  res.send('Hello')
});


app.get('/', (req, res) => {
  console.log('fuc');
  res.send('Hello')
});

app.listen(port, () => {
  console.log('api running on ', port);
});