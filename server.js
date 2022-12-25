const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT

const app = express()

// look for static files in the public folder
app.use(express.static('public'))

// require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts')

// look in views folder for layout.ejs files
app.use(expressLayouts)

// Express session and passport
const session = require('express-session')
const passport = require('./helper/ppConfig')

// set up session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 36000000 }
}))

// set up passport
app.use(passport.initialize())
app.use(passport.session())

//Sharing the information with all pages
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
})
// ------------------------------------------------------------------------------------------------------------

// import routes
const indexRoute = require('./routes/index')
const instructorRoute = require('./routes/instructor')
const courseRoute = require('./routes/course')
const studentRoute = require('./routes/student')
// const collegeRoutes = require('./routes/college')
const authRoute = require('./routes/auth')

// mount routes
app.use('/', indexRoute)
app.use('/', instructorRoute)
app.use('/', courseRoute)
app.use('/', studentRoute)
// app.use('/', collegeRoutes)
app.use('/', authRoute)


// ------------------------------------------------------------------------------------------------------------
// set view engine to ejs
app.set('view engine', 'ejs')

mongoose.set('strictQuery', false)
mongoose.connect(
  process.env.mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('DB connected successfully')
  }
)

app.listen(port, () => {
  console.log(`General Assembly App listening at http://localhost:${port}`)
})

app.get('/a', (req, res) => {
  res.render('home/another')
})

