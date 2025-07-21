const isATeacher = (req, res, next) => {
  console.log(req.session.user.role)
  if (req.session.user.role === 'teacher') return next()
  res.redirect('/posts/all')
}

module.exports = isATeacher