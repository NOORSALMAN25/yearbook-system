const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/post')
const Post = require('../models/Post')
const upload = require('../config/multer')

router.post('/', upload.single('image'), postCtrl.Posts_create_post)

router.get('/new', postCtrl.Posts_create_get)
// router.post('', postCtrl.Posts_create_post)
router.get('', postCtrl.Posts_index_get)
router.get('/:postId', postCtrl.Posts_show_get)

router.delete('/:postId', postCtrl.Posts_delete_delete)

module.exports = router
