// ref. http://expressjs.com/ja/guide/routing.html
const express = require('express')
const router = express.Router()
const memosRouter = require('./memos')

router.get('/', function (req, res) {
  res.send('api index')
})

router.use('/memos', memosRouter)

module.exports = router
