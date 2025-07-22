const express = require('express')
const router = express.Router()
const upload = require('../config/multer')

const authCtrl = require('../controllers/auth')
router.get('/sign-up', authCtrl.auth_signup_get)
router.post('/sign-up', upload.single('pfp'), authCtrl.auth_signup_post)
router.get('/sign-in', authCtrl.auth_signin_get)
router.post('/sign-in', authCtrl.auth_signin_post)
router.get('/sign-out', authCtrl.auth_signout_get)

module.exports = router
