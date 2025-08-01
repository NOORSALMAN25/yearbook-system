const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.auth_signup_get = (req, res) => {
  res.render('auth/sign-up.ejs')
}

exports.auth_signup_post = async (req, res) => {
  const emailInDatabase = await User.findOne({ email: req.body.email })
  const userInDatabase = await User.findOne({ username: req.body.username })

  if (!req.body.email) {
    return res.send('Email empty')
  }
  if (emailInDatabase) {
    return res.send('Email already taken!')
  }

  if (!req.body.username) {
    return res.send('Username empty')
  }
  if (userInDatabase) {
    return res.send(' Username already taken! Please choose another one.')
  }

  if (!req.body.password) {
    return res.send('Password empty')
  } else if (req.body.password !== req.body.confirmPassword) {
    return res.send(
      'Passwords do not match or password was not entered. Please try again.'
    )
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  const newUser = await User.create({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    pfp: req.file ? req.file.filename : 'default_pfp.jpg'
  })
  res.redirect('sign-in')
}

exports.auth_signin_get = async (req, res) => {
  res.render('auth/sign-in.ejs')
}

exports.auth_signin_post = async (req, res) => {
  const emailInDatabase = await User.findOne({ email: req.body.email })

  if (!emailInDatabase) {
    res.send('Invalid email or password.')
  } else {
    const validPassword = bcrypt.compareSync(
      req.body.password,
      emailInDatabase.password
    )

    if (!validPassword) {
      res.send('Invalid email or password.')
    } else {
      req.session.user = {
        email: emailInDatabase.email,
        id: emailInDatabase._id,
        role: emailInDatabase.role
      }

      req.session.loggedInuser = {
        email: emailInDatabase.email,
        id: emailInDatabase._id,
        role: emailInDatabase.role
      }

      const currentUser = await User.findOne(req.body.id)
      res.redirect(`/user/${emailInDatabase._id}/profile`)
    }
  }
}

exports.auth_signout_get = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}
