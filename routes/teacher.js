const express = require("express")
const router = express.Router()
const teacherCtrl = require("../controllers/teacher")

router.get('/',teacherCtrl.teacher_index_get)
router.delete('/:id', teacherCtrl.teacher_delete_delete)

module.exports = router
