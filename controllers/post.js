const User = require('../models/User')
const Post = require('../models/Post')
const upload = require('../config/multer')

exports.Posts_create_get = async (req, res) => {
  res.render('posts/new.ejs')
}

exports.Posts_create_post = async (req, res) => {
  const user = await User.findById(req.session.user.id)
  const imagePath = req.file ? `public/uploads/${req.file.filename}` : null
  const post = await Post.create({
    image: imagePath,
    creator_id: user._id,
    quote: req.body.quote
  })

  user.posts.push(post._id)
  await user.save()

  res.redirect(`/posts/${post._id}`)
}

exports.Posts_index_get = async (req, res) => {
  const user = await User.findById(req.session.user.id)
  let posts = []
  if (user.role === 'student') {
    posts = await Post.find({ creator_id: req.session.user.id })
  } else {
    posts = await Post.find()
  }

  res.render('posts/all.ejs', { posts })
}

exports.Posts_show_get = async (req, res) => {
  const post = await Post.findById(req.params.postId)
  const user = await User.findById(req.session.user.id)
  const postedById = await User.findById(post.creator_id)
  const pfpOfPoster = await postedById.pfp
  const postedByName = await postedById.username
  const roleOfUser = user.role
  res.render('posts/show.ejs', { post, user, roleOfUser, postedByName, pfpOfPoster, postedById})
}

exports.Posts_edit_get = async (req, res) => {
  const post = await Post.findById(req.params.postId)
  res.render('posts/edit.ejs', { post })
}

exports.Posts_update_put = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.postId, req.body)
  res.redirect(`/posts/${req.params.postId}`)
}

exports.Posts_delete_delete = async (req, res) => {
  await User.findByIdAndUpdate(req.session.user.id, {
    $pull: { posts: req.params.postId }
  })
  const post = await Post.findByIdAndDelete(req.params.postId)
  await post.deleteOne()
  res.redirect('/posts')
}
