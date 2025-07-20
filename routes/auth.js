const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth')


router.get('/sign-up', authCtrl.auth_signup_get)


module.exports = router