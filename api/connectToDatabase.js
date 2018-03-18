const mongoose = require('mongoose')

// // Count nets:: model.count http://mongoosejs.com/docs/api.html#count_count
// // Update nets count http://mongoosejs.com/docs/api.html#findoneandupdate_findOneAndUpdate
const connectToDatabase = () => {
  console.log('Environment: ', process.env.environment);

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
}

module.exports = connectToDatabase