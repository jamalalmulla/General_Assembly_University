const express = require('express');
const router = express.Router();
// const methodOverride = require('method-override');

// router.use(methodOverride('_method'));
router.use(express.urlencoded({ extended: true }));


const studentController = require('../controllers/student');

router.get('/student/addCourse', studentController.student_CoursecCreate_get);
router.put('/student/addCourse', studentController.student_courseCreate_put);

router.get('/student/index', studentController.student_index_get);
router.get("/student/detail", studentController.student_show_get);
router.get("/student/delete", studentController.student_delete_get);
router.get("/student/edit", studentController.student_edit_get);
router.put("/student/update", studentController.student_edit_put);


module.exports = router;
