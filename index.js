const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')

require('dotenv').config()

// static files
const staticPath = path.join(__dirname, 'public')
app.use('/static', express.static(staticPath))

// GET /index
app.get('/', (req, res) => {
  const nodeEnv = process.env.NODE_ENV
  res.send(`Hello, World! (${nodeEnv})`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
