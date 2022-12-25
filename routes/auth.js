const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));


const authCtrl = require('../controllers/auth');

router.get('/auth/signup', authCtrl.auth_signup_get);
router.get('/auth/instructor_signup', authCtrl.instructor_signup_get);
router.get('/auth/student_signup', authCtrl.student_signup_get);
router.post('/auth/instructor_signup', authCtrl.instructor_signup_post);
router.post('/auth/student_signup', authCtrl.student_signup_post);
router.get('/auth/signin', authCtrl.auth_signin_get);
router.post('/auth/signin', authCtrl.auth_signin_post);
router.get('/auth/logout', authCtrl.auth_logout_get);

module.exports = router;
