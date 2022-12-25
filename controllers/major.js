// const Major = require("../models/Major");
// const Course = require("../models/Course");
// const User = require("../models/User");

// const moment = require ('moment');

// exports.major_index_get = (req, res) => {
//     Major.find().populate("user")
//     .then((majors) =>{
//         res.render("major/index", {majors, moment})
//     } )
//     .catch((err)=> {
//         console.log(err)
//     });
// }

// exports.major_edit_get = (req, res) => {
//     Major.findById(req.query.id)
//     .then(major => {
//         res.render("major/edit", {major});
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// exports.major_update_put = (req, res) => {
//     console.log(req.body.id);
//     Major.findByIdAndUpdate(req.body.id, req.body)
//     .then(() => {
//         res.redirect("/major/index");
//     })
//     .catch(err => {
//         console.log(err)
//     });
// }

// exports.major_create_get = (req, res) =>{
//     Major.find()
//     .then((major) => {
//         res.render("major/add", { major })
//     })
//     .catch(err => {
//         console.log(err)
//     });
// }

// exports.major_show_get = (req, res) => {
//     console.log(req.query.id);
//     Major.findById(req.query.id).populate('user')
//     .then(major => {
//         res.render("major/detail", {major, moment})
//     })
// }

// exports.major_create_post =
//    (req, res) => {
//     console.log(req.body);
//     let major =new Major(req.body);

//     major.save()
//     .then(() => {
//         res.redirect("/major/index");
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send("Error occurred while saving the major");
//     });
// }

// exports.major_delete_get = (req, res) => {
//     console.log(req.query.id);
//     Major.findByIdAndDelete(req.query.id)
//     .then(()=>{
//         res.redirect("/major/index");
//     })
//     .catch(err => {
//         console.log(err);
//     })
// };





const Major = require("../models/Major");
const User = require("../models/User");
const Course = require("../models/Course");
const Student = require("../models/Student");

const moment = require ('moment');



exports.major_index_get = (req, res) =>{
    Major.find()
    .then((majors) =>{
        res.render("major/index", {majors, moment})
    } )
    .catch((err)=> {
        console.log(err)
    });
}

exports.major_edit_get = (req, res) => {
    Major.findById(req.query.id)
    .then(major => {
        res.render("major/edit", {major});
    })
    .catch(err => {
        console.log(err);
    })
}

exports.major_update_put = (req, res) => {
    console.log(req.body.id);
    Major.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/major/index");
    })
    .catch(err => {
        console.log(err)
    });
}

exports.major_create_get = (req, res) =>{
    let students;
    Student.find()
    .then((student) =>{
        students = student
    } )
    .catch((err)=> {
        console.log(err)
    });

    let major;
    Major.find()
    .then((major) =>{
        major = major
    } )
    .catch((err)=> {
        console.log(err)
    });

    Major.find()
    .then((major) => {
        res.render("major/add", { major, students })
    })
    .catch(err => {
        console.log(err)
    });
}

exports.major_create_post =
   (req, res) => {
    
    console.log(req.body);
    let major =new Major(req.body);

    major.save()
    .then(() => {
        res.redirect("/major/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Error occurred while saving the major");
    });
}

exports.major_delete_get = (req, res) => {
    console.log(req.query.id);
    Major.findByIdAndDelete(req.query.id)
    .then(()=>{
        res.redirect("/major/index");
    })
    .catch(err => {
        console.log(err);
    })
};