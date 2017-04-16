// ref. http://expressjs.com/ja/guide/routing.html
const express = require('express')
const router = express.Router()
const path = require('path')
const env = process.env.NODE_ENV || 'development'
const knexConfig = require(path.join(global.__base, 'knexfile.js'))[env]
const knex = require('knex')(knexConfig)

router.get('/', function (req, res) {
  knex.select('*').from('memos').then((rows) => {
    res.send(rows)
  })
})

module.exports = router
