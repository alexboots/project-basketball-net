const RequestLocation = require('../models/RequestLocation')

const getAllRequests = (req, res) => {
  RequestLocation.find({ requestFulfilled: false }, function (err, docs) {
    if(err) {
      console.error('request unfulfilled requests', err);
      res.status(500).send(err)
    }
    res.send(docs)
  })
}

module.exports = getAllRequests