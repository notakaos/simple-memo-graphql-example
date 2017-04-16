// ref. http://expressjs.com/ja/guide/routing.html
const express = require('express')
const router = express.Router()
const knex = require(`${global.__base}/lib/knex`)

router.get('/', function (req, res) {
  knex.select('*').from('memos').then((rows) => {
    res.send(rows)
  })
})

module.exports = router
