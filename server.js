const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()
const db = require('./config/db')
const multer = require('multer')
const User = require('./models/User')

const PORT = process.env.PORT ? process.env.PORT : 3000

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

// storage
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const uploads = multer({
  storage: Storage
}).single('pfpImage')

app.post('/upload', (req, res) => {
  uploads(req, res, (err) => {
    if (err) {
      console.log
    } else {
      const newImage = new User({
        role: req.body.role,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        pfp: {
          data: req.file.filename,
          contentType: 'image/png'
        }
      })
      newImage.save().then(() => res.send('successfully uploaded'))
    }
  })
})

app.get('/', (req, res) => {
  res.render('index.ejs')
})

// require routes
const teacherRouter = require('./routes/teacher.js')
const authRouter = require('./routes/auth.js')

// use routes
// app.use('/teacher', teacherRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`running sever on port no. ${PORT} . . . `)
})
