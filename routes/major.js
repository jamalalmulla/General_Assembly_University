const express = require('express');

const router = express.Router();

const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.use(express.urlencoded ({ extended: true}))

const majorCtrl = require ("../controllers/major")

router.get("/major/index", majorCtrl.major_index_get)

router.get("/major/index", majorCtrl.major_create_get);
router.post("/major/add", majorCtrl.major_create_post);
router.get("/major/edit", majorCtrl.major_edit_get);
router.put("/major/update", majorCtrl.major_update_put);
router.get("/major/delete", majorCtrl.major_delete_get);
router.get("/major/detail", majorCtrl.major_show_get );



module.exports = router;

