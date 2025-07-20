const User = require('../models/User')
const Post = require('../models/Post')
const { post } = require('../routes/post')

exports.Posts_create_get = async (req, res) => {
  res.render('posts/new.ejs')
}

exports.Posts_create_post = async (req, res) => {
  const user = await User.findById(req.session.creator_id)
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null
  const post = await Post.create({
    ...req.body,
    image: imagePath,
    creator_id: user._id
  })

  user.posts.push(post._id)
  await user.save()

  res.redirect(`/posts/${post._id}`)
}

exports.Posts_index_get = async (req, res) => {
  const posts = await post.find()
  res.render('posts/all.ejs', { posts })
}

exports.Posts_show_get = async (req, res) => {
  const post = await Post.findById(req.params.postId)
  res.render('posts/show.ejs', { post })
}
