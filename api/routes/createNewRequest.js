const RequestLocation = require('../models/RequestLocation')

const createNewRequest = (req, res) => {
  RequestLocation.create({
      ...req.body,
      location: {
        coordinates: [req.body.location.lat, req.body.location.lng]
      }
    }, function (err, response) {
      if(err) { res.status(500).send(err) }
      res.send(response)
    })
}

module.exports = createNewRequest