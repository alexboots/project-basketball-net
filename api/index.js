require('dotenv').config()
const express      = require('express')
const app          = express()
const cors         = require('cors')
const bodyParser   = require('body-parser')
const mongoose = require('mongoose')

const RequestLocation = require('./models')

if(!process.env.envFileExists) {
  console.log("!!! The .env file does not exist")
  console.log("Please rename .env.development to .env")
  console.log("Or ping  @alexboots and ask for it :)")
}

const port = process.env.port

let connectionString = null
if(process.env.environment === 'development') {
  connectionString = `mongodb://${process.env.dbuser}:${process.env.dbpass}@ds247178.mlab.com:47178/dev-project-basketball-net`
} else {
  connectionString = `mongodb://${process.env.dbuser}:${process.env.dbpass}@ds147518.mlab.com:47518/project-basketball-net`
}

mongoose.connect(connectionString)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('🗣  Database connection successful')
  // make maerker on map where its been requested already
})


app.use(cors())
app.use(bodyParser.json())

app.get('/requests', function (req, res) {
  const requests = RequestLocation.find({ requestFulfilled: false })

  console.log('requests', JSON.stringify(requests));
  // res.send(requests)
})


app.post('/request', (req, res) => {
  console.log('F', {
    ...req.body,
    location: {
      coordinates: [req.body.location.lat, req.body.location.lng]
    }
  })

  RequestLocation.create({
    ...req.body,
    location: {
      coordinates: [req.body.location.lat, req.body.location.lng]
    }
  })

  res.send('REQUESTED')
});

app.get('/', (req, res) => {
  console.log('fuc');
  res.send('Hello')
});

app.listen(port, () => {
  console.log('api running on ', port);
});