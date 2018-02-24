require('dotenv').config()
const express      = require('express')
const app          = express()
const cors         = require('cors')
const bodyParser   = require('body-parser')
const mongoose = require('mongoose')

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
  defineModels()
})

let RequestLocation
function defineModels() {
  const requestLocationSchema = new mongoose.Schema({
    fullAddress: String,
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number]
    },
    placeId: String,
    createdAt: { type: Date, default: Date.now },
    requestFulfilled: { type: Boolean, default: false },
    fulfilledDate: { type: Date, default: null },

    // inputs
    notes: String,
    nets: Number,
    hoops: Number,
  })

  // name
  // howManyNetsNeeded
  // howManyBasketballHoops


  // +1 everytime a request is fulfilled, should probably use a query instead
  const netCountSchema = new mongoose.Schema({ ammount: Number })

  RequestLocation = mongoose.model('RequestLocation', requestLocationSchema)
}

app.use(cors())
app.use(bodyParser.json())


app.post('/request', (req, res) => {

  console.log('F', {
    ...req.body,
    location: {
      coordinates: [req.body.location.lat, req.body.location.lng]
    }
  });

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