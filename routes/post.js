const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/post')
const Post = require('../models/Post')

router.get('/new', postCtrl.Posts_create_get)
router.post('', postCtrl.Posts_create_post)

router.get('', postCtrl.Posts_index_get)
router.get('/:postId', postCtrl.Posts_show_get)

// router.get('/:recipeId/edit', recipesCtrl.Recipes_edit_get)
// router.put('/:recipeId', recipesCtrl.Recipes_update_put)

// router.delete('/:recipeId', recipesCtrl.Recipes_delete_delete)

module.exports = router
