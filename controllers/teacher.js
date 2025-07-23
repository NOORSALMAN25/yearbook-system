const User = require('../models/User')
const Post = require('../models/Post')

exports.teacher_index_get = async (req, res) => {
  const users = await User.find({})
  const students = []
  users.forEach((user) => {
    if (user.role === 'student') {
      students.push(user)
    }
  })
  res.render('user/teacher.ejs', { students })
}

exports.teacher_delete_delete = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  await Post.findByIdAndDelete(req.params.id.posts)

  res.redirect('/teacher')
}
