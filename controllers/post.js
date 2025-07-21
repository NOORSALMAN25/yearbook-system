const User = require('../models/User')
const Post = require('../models/Post')
// const upload = require('../config/multer')

exports.Posts_create_get = async (req, res) => {
  res.render('posts/new.ejs')
}

exports.Posts_create_post = async (req, res) => {
  // console.log('hello')
  const user = await User.findById(req.session.user.id)
  // console.log('user tracked')
  const imagePath = req.file ? `public/uploads/${req.file.filename}` : null
  // console.log(imagePath)
  // console.log('file name tracked')
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
  const imagePath = req.file ? `public/uploads/${req.file.filename}` : null
  console.log(imagePath)
  const posts = await imagePath
  res.render('posts/all.ejs', posts)
}

exports.Posts_show_get = async (req, res) => {
  const post = await Post.findById(req.params.postId)
  res.render('posts/show.ejs', { post })
}

exports.Posts_delete_delete = async (req, res) => {
  await Post.findByIdAndDelete(req.params.postId)
  res.redirect('/posts')
}
