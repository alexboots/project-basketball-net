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


function defineModels() {
  const requestLocationSchema = new mongoose.Schema({
    name: String,
    loc: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }
    },
    requestFulfilled: { type: Boolean, default: false },
    fulfilledDate: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    howManyNetsNeeded: Number,
    howManyBasketballHoops: Number
  })

  // +1 everytime a request is fulfilled, should probably use a query instead
  const netCountSchema = new mongoose.Schema({ ammount: Number })

  const RequestLocation = mongoose.model('RequestLocation', requestLocationSchema)

  // YEAH BB
  RequestLocation.create({
    name: 'Dallas TEHAS',
    loc: {
        type: 'Point',
        // Place longitude first, then latitude
        coordinates: [-79.3968307, 43.6656976]
    },
    howManyNetsNeeded: 3,
    howManyBasketballHoops: 3
  })
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