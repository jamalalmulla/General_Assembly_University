const express = require('express');

const router = express.Router();

const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.use(express.urlencoded ({ extended: true}))

const courseCtrl = require ("../controllers/course")

router.get("/course/index", courseCtrl.course_index_get)

router.get("/course/add", courseCtrl.course_create_get);
router.post("/course/add", courseCtrl.course_create_post);
router.get("/course/edit", courseCtrl.course_edit_get);
router.put("/course/update", courseCtrl.course_update_put);
router.get("/course/delete", courseCtrl.course_delete_get);
router.get("/course/detail", courseCtrl.course_show_get );



module.exports = router;