const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user ? req.session.user : null

  res.locals.loggedInuser = req.session.loggedInuser
    ? req.session.loggedInuser
    : null
  next()
}

module.exports = passUserToView
