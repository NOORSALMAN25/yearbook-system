const express = require('express')
const router = express.Router()
const yearbookCtrl = require('../controllers/yearbook')

router.get('/', yearbookCtrl.yearbook_index_get)

module.exports = router
