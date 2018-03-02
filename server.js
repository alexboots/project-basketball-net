require('dotenv').config()
let express = require('express')
let app = express()
let proxy = require('http-proxy-middleware')
let https = require('https')
let fs = require('fs')

let port
let sslPath
let options

// To test  from terminal:
// To test the production build locally run:
//  `NODE_ENV=development node server.js`
//  Must have ran `yarn build` first.
// Use `yarn dev` server for developing

if(process.env.environment === 'development') {
  port = 1234
  sslPath = ''
  options = {}
} else {
   port = 80
   sslPath = '/etc/letsencrypt/live/www.projectbasketball.net/'
   options = {
      key: fs.readFileSync(sslPath + 'privkey.pem'),
      cert: fs.readFileSync(sslPath + 'fullchain.pem')
  }
}


app.use('/dist', express.static('dist'))
app.use(express.static(__dirname + '/dist'))
app.use(require('helmet')())

app.use((req, res, next) => {
  if (!req.secure && process.env.environment !== "development") {
    let addWWW = ''
    if (req.headers.host.slice(0, 4) !== 'www.') {
      addWWW = 'www.'
    }
    console.log('\n');
    console.log("`https://${addWWW}` + req.get('host') + req.url", `https://${addWWW}` + req.get('host') + req.url);
    console.log("\n");
    return res.redirect(`https://${addWWW}` + req.get('host') + req.url)
  }
  next()
})

let apiProxy = proxy('/api/', {
  target: 'http://0.0.0.0:3000',
  changeOrigin: false
})

app.use(apiProxy)

if(process.env.environment !== 'development') {
  https.createServer(options, app).listen(443)
} else {
  app.listen(port)
}

console.log('Why hello there')