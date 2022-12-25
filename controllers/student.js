// Require Model
const User = require("../models/User");
const Course = require("../models/Course");
// Require Moment
const moment = require('moment');
// Add Student with a reference to the courses
exports.student_CoursecCreate_get = (req, res) => {
  User.findById(req.query.id)
        .then((student) => {
            Course.find()
            .then((courses ) => {

                res.render("student/addCourse", { student, courses });
            })
            .catch(err => {
                console.log(err)
            });
        })
        .catch(err => {
            console.log(err)
        });

}

exports.student_courseCreate_put = (req, res) => {
    // let theStudent = req.body;
    //////////////////////////////////////
    User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/student/index");
    })
    .catch(err => {
        console.log(err)
    });
    /////////////////////////////////////
}

// HTTP GET - Student Index
exports.student_index_get = (req, res) => {
    User.find({ userRole: 'student' }).populate('course')
    .then(students => {
        res.render("student/index", {students, moment})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Studenet by ID
exports.student_show_get = (req, res) => {
    User.findById(req.query.id).populate('course')
    .then(student => {
        res.render("student/detail", {student, moment})
    })
    .catch(err => {
        console.log(err);
    })
}

  // HTTP DELETE -  Student
exports.student_delete_get = (req, res) => {
    User.findByIdAndDelete(req.query.id)
        .then(() => {
            res.redirect("/student/index");
        })
        .catch(err => {
            console.log(err);
        })
}
////////////////////////////////////////////////////
exports.student_edit_get = function(req, res) {
    User.findById(req.query.id)
      .then((student) => {
        res.render('student/edit', { student })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  exports.student_edit_put = function(req, res) {
    User.findByIdAndUpdate(req.body.id, req.body)
      .then((student) => {
        if (bcrypt.compareSync(req.body.old_password, instructor.password)) {
          console.log('Old Password Matched')
        } else {
          console.log('Old Password Not Matched')
          return res.redirect('/student/edit?id=' + req.body.id)
        }
        if (req.body.new_password !== req.body.confirm_password) {
          console.log('New Password does not match')
          return res.redirect('/student/edit?id=' + req.body.id)
        } else {
          instructor.password = bcrypt.hashSync(req.body.new_password, salt)
          console.log('Password Updated successfully')
          res.redirect('/student/index')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
