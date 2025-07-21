const isSignedIn = (req, res, next) => {
  if (req.session.user) console.log(req.session.id)
  console.log(req.session.user.id)
  return next()
  res.redirect('/auth/sign-in')
}

module.exports = isSignedIn
