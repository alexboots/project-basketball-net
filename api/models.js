const mongoose = require('mongoose')

const requestLocationSchema = new mongoose.Schema({
  formattedAddress: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  createdAt: { type: Date, default: Date.now },
  requestFulfilled: { type: Boolean, default: false },
  fulfilledDate: { type: Date, default: null },

  // inputs
  notes: String,
  netsRequested: Number,
  hoopsCount: Number,
})

// +1 everytime a request is fulfilled, should probably use a query instead
// const netCountSchema = new mongoose.Schema({ ammount: Number })

const RequestLocation = mongoose.model('RequestLocation', requestLocationSchema)


module.exports = {
  RequestLocation: RequestLocation
  // netCountSchema
}
