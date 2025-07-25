const isATeacher = (req, res, next) => {
  if (req.session.user.role === 'teacher') return next()
  res.redirect('/posts')
}

module.exports = isATeacher