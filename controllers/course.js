const Course = require("../models/Course");
const User = require("../models/User");

const moment = require ('moment');

exports.course_index_get = (req, res) =>{
    Course.find().populate("user")
    .then((courses) =>{
        res.render("course/index", {courses, moment})
    } )
    .catch((err)=> {
        console.log(err)
    });
}

exports.course_edit_get = (req, res) => {
    Course.findById(req.query.id)
    .then(course => {
        res.render("course/edit", {course});
    })
    .catch(err => {
        console.log(err);
    })
}

exports.course_update_put = (req, res) => {
    console.log(req.body.id);
    Course.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/course/index");
    })
    .catch(err => {
        console.log(err)
    });
}

exports.course_create_get = (req, res) =>{
    Course.find()
    .then((course) => {
        res.render("course/add", { course })
    })
    .catch(err => {
        console.log(err)
    });
}

exports.course_show_get = (req, res) => {
    console.log(req.query.id);
    Course.findById(req.query.id).populate('user')
    .then(course => {
        res.render("course/detail", {course, moment})
    })
}

exports.course_create_post =
   (req, res) => {
    console.log(req.body);
    let course =new Course(req.body);

    course.save()
    .then(() => {
        res.redirect("/course/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Error occurred while saving the course");
    });
}

exports.course_delete_get = (req, res) => {
    console.log(req.query.id);
    Course.findByIdAndDelete(req.query.id)
    .then(()=>{
        res.redirect("/course/index");
    })
    .catch(err => {
        console.log(err);
    })
};
