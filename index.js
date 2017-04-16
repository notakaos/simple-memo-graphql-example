const path = require('path')
global.__base = path.join(__dirname, '/')

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const hbs = require('express-hbs')

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

// GET /hello
app.get('/hello', (req, res) => {
  const nodeEnv = process.env.NODE_ENV
  res.send(`Hello, World! (${nodeEnv})`)
})

// /api
const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

// /graphql
const graphqlRouter = require('./routes/graphql')
app.use('/graphql', graphqlRouter)

// /apollo
const apolloRouter = require('./routes/apollo')
app.use('/apollo', apolloRouter)

// GET /
app.get('/', (req, res) => {
  res.render('index', {env: process.env.NODE_ENV})
})

// Run server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
