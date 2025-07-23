const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const upload = require('../config/multer.js')

router.get('/:id/profile', userCtrl.user_show_get)
router.get('/:id/edit', userCtrl.user_edit_get)
router.put('/:id', upload.single('pfp'), userCtrl.user_update_put)

module.exports = router
