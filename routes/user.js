const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

// router.get('/:id', userCtrl.user_show_get)
router.get('/:id/profile', userCtrl.user_show_get)

module.exports = router
