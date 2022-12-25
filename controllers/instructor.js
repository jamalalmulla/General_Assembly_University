const User = require('../models/User')
const Course = require('../models/Course')
const bcrypt = require('bcrypt')

const salt = 10
/* const moment = require('moment') */

exports.instructor_index_get = function(_req, res) {
  User.find({ userRole: 'instructor' }).populate('course')
    .then((instructors) => {
      res.render('instructor/index', { instructors })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.instructor_create_get = function(req, res) {
  User.find({ userRole: 'instructor' })
    .then((instructor) => {
      if (instructor.length > 0) {
        res.render('instructor/add')
      } else {
        instructor = new User({
          firstName: 'Mohamed',
          lastName: 'Faris',
          email: 'mohd.faris07@gmail.com',
          password: bcrypt.hashSync('123456', salt),
          userRole: 'instructor',
          userId: '0001',
          office: 'B-123',
        })
        instructor.save()
        res.redirect('/instructor/index')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.instructor_create_post = function(req, res) {
  User.find({ userRole: 'instructor' })
    .then((instructor) => {
      let length = instructor.length
      instructor = new User(req.body)
      instructor.userRole = 'instructor'
      instructor.userId = `000${length + 1}`
      instructor.office = `B-00${length + 1}`
      instructor.password = bcrypt.hashSync('123456', salt)
      instructor.save()
      res.redirect('/instructor/index')
    })
    .catch((err) => {
      console.log(err)
      console.log('Something went wrong')
    })
}

exports.instructor_edit_get = function(req, res) {
  User.findById(req.query.id)
    .then((instructor) => {
      res.render('instructor/edit', { instructor })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.instructor_edit_put = function(req, res) {
  User.findByIdAndUpdate(req.body.id, req.body)
    .then((instructor) => {
      if (bcrypt.compareSync(req.body.old_password, instructor.password)) {
        console.log('Old Password Matched')
      } else {
        console.log('Old Password Not Matched')
        return res.redirect('/instructor/edit?id=' + req.body.id)
      }
      if (req.body.new_password !== req.body.confirm_password) {
        console.log('New Password does not match')
        return res.redirect('/instructor/edit?id=' + req.body.id)
      } else {
        instructor.password = bcrypt.hashSync(req.body.new_password, salt)
        console.log('Password Updated successfully')
        res.redirect('/instructor/index')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.instructor_show_get = function(req, res) {
  User.findById(req.query.id).populate('course')
    .then((instructor) => {
      res.render('instructor/detail', { instructor })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.instructor_addCourse_get = function(req, res) {
  console.log(req.query.id)
  User.findById(req.query.id)
    .then((instructor) => {
      Course.find()
        .then((courses) => {
          res.render('instructor/addCourse', { instructor, courses })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.instructor_addCourse_put = function(req, res) {
  User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/instructor/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.instructor_delete_get = function(req, res) {
  User.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('/instructor/index')
    })
    .catch((err) => {
      console.log(err)
      res.send('Something went wrong')
    })
}
