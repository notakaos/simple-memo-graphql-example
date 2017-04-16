const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('dotenv').config()

app.get('/', (req, res) => {
  const nodeEnv = process.env.NODE_ENV
  res.send(`Hello, World! (${nodeEnv})`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
