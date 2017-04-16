const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const hbs = require('express-hbs')

const apiRouter = require('./routes/api')

require('dotenv').config()

// static files
const staticPath = path.join(__dirname, 'public')
app.use('/static', express.static(staticPath))

// set view engine
app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// GET /
app.get('/', (req, res) => {
  res.render('index', {env: process.env.NODE_ENV})
})

// GET /hello
app.get('/hello', (req, res) => {
  const nodeEnv = process.env.NODE_ENV
  res.send(`Hello, World! (${nodeEnv})`)
})

// /api
app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
