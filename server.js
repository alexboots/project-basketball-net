let express = require('express')
let app = express()
// let https = require('https')
// let fs = require('fs')

let port
let sslPath
let options

// To test  from terminal:
// To test the production build locally run:
//  `NODE_ENV=development node server.js`
//  Must have ran `yarn build` first.
// Use `yarn dev` server for developing
if(process.env.NODE_ENV === 'development') {
  port = 1234
  sslPath = ''
  options = {}
} else {
   port = 80
  //  sslPath = '/etc/letsencrypt/live/www.wordswithfiends.com/'
  //  options = {
  //     key: fs.readFileSync(sslPath + 'privkey.pem'),
  //     cert: fs.readFileSync(sslPath + 'fullchain.pem')
  // }
}


app.use('/dist', express.static('dist'))
app.use(express.static(__dirname + '/dist'))
// app.use(require('helmet')())

app.listen(port)

// if(process.env.NODE_ENV !== 'development') {
//   https.createServer(options, app).listen(443)
// }

console.log('Why hello there')