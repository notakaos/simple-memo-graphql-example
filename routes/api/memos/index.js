// ref. http://expressjs.com/ja/guide/routing.html
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send('memos index')
})

module.exports = router
