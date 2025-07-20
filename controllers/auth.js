const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.auth_signup_get = (req, res) => {
  res.render('auth/sign-up.ejs')
}

exports.auth_signup_post = async (req, res) => {
  const emailInDatabase = await User.findOne({ email: req.body.email })
  const userInDatabase = await User.findOne({ username: req.body.username })

  if (userInDatabase) {
    res.send(' Username already taken! Please choose another one.')
  }
  if (emailInDatabase) {
    res.send('Email already taken!')
  } else if (req.body.password !== req.body.confirmPassword) {
    res.send('Passwords do not match. Please try again.')
  } else {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      pfp: req.body.pfp
    })
    res.send(`Welcome ${newUser.username}! Your account has been created.`)
  }
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
        id: emailInDatabase._id
      }
      const currentUser = await User.findOne(req.body.id)
      res.redirect(`/user/${currentUser._id}/profile`)
    }
  }

}

exports.auth_signout_get = (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/')
  } catch (error) {
    console.error('An error has occurred signing out a user!', error.message)
  }
}
