const express = require('express')
const router = express.Router()
// const knex = require(`${global.__base}/lib/knex`)
// const _ = require('lodash')

router.use('/', (req, res) => {
  res.send('Apollo')
})

module.exports = router
