const User = require('../models/User')
const bcrypt = require('bcrypt')
const salt = 10
let passport = require('../helper/ppConfig')

exports.auth_signup_get = (req, res) => {
  res.render('auth/signup', { layout: false })
}

exports.instructor_signup_get = (req, res) => {
  res.render('auth/instructor_signup', { layout: false })
}

exports.student_signup_get = (req, res) => {
  res.render('auth/student_signup', { layout: false })
}

exports.instructor_signup_post = (req, res) => {
  User.find({userRole: 'instructor'})
    .then((instructor) => { 
      let length = instructor.length
      instructor = new User(req.body)
      instructor.userRole = 'instructor'
      instructor.userId = `000${length + 1}`
      instructor.office = `B-00${length + 1}`
      instructor.password = bcrypt.hashSync(req.body.password, salt)
      instructor.save()
      res.redirect('/instructor/index')
    })
    .catch((err) => console.log(err))
}

exports.student_signup_post = (req, res) => {
  User.find({userRole: 'student'})
    .then((student) => { 
      let length = student.length
      student = new User(req.body)
      student.userRole = 'student'
      student.userId = `000${length + 1}`
      student.office = null
      student.password = bcrypt.hashSync(req.body.password, salt)
      student.save()
      res.redirect('/student/index')
    })
    .catch((err) => console.log(err))
}

exports.auth_signin_get = (req, res) => {
  res.render('auth/signin', { layout: false })
}

exports.auth_signin_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/signin',
})

// logout
exports.auth_logout_get = (request, response) => {
  // invalidate session
  request.logout(function(error) {
    if (error) {
      return next(error)
    }
    response.redirect('/auth/signin')
  })
}

exports.auth_logout_get = (request, response) => {
  // invalidate session
  request.logout(function(error) {
    if (error) {
      return next(error)
    }
    response.redirect('/auth/signin')
  })
}
