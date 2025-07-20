const Teacher = require('../models/User')
const Post = require('../models/Post')

exports.teacher_show_get = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id)
  const posts = await Post.find({ author: user._id })
  const data = {
    role: 'teacher',
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
    
  }
  res.render('./users/profile.ejs', { user: data })
}
