const getAllRequests = require('./getAllRequests')
const createNewRequest = require('./createNewRequest')

const initializeRoutes = (app) => {
  const baseRoute = '/api'
  app.get(`${baseRoute}/requests`, (req, res) => {
    getAllRequests(req, res)
  })

  app.post(`${baseRoute}/request`, (req, res) => {
    createNewRequest(req, res)
  })
}

module.exports = initializeRoutes