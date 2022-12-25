const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
router.use(express.urlencoded({ extended: true }));

const validate = require('../helper/loggedAsInstructor')

const instructorController = require('../controllers/instructor');

router.get('/instructor/add', instructorController.instructor_create_get);
router.post('/instructor/add', instructorController.instructor_create_post);
router.get('/instructor/index', instructorController.instructor_index_get);
router.get('/instructor/edit', validate, instructorController.instructor_edit_get);
router.put('/instructor/update', instructorController.instructor_edit_put);
router.get('/instructor/detail', instructorController.instructor_show_get);
router.get('/instructor/addCourse', validate, instructorController.instructor_addCourse_get);
router.put('/instructor/addCourse', validate, instructorController.instructor_addCourse_put);
router.get('/instructor/delete', validate, instructorController.instructor_delete_get);

module.exports = router;
