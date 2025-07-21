const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()
const db = require('./config/db')
const multer = require('multer')
const User = require('./models/User')
const path = require('path')

const PORT = process.env.PORT ? process.env.PORT : 3000

const app = express()

const isATeacher = require('./middleware/is-a-teacher-.js')
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passUserToView)

app.get('/', (req, res) => {
  res.render('index.ejs')
})

// require routes
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/user.js')
const postRouter = require('./routes/post.js')
const yearbookRouter = require('./routes/yearbook.js')

// use routes
app.use('/auth', authRouter)
app.use('/user', isSignedIn, userRouter)
app.use('/posts', isSignedIn, postRouter)
app.use('/yearbook', isSignedIn, isATeacher, yearbookRouter)

app.listen(PORT, () => {
  console.log(`running sever on port no. ${PORT} . . . `)
})
