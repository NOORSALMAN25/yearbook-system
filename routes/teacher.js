const router = require('express').Router()
const teacherCtrl = require('../controllers/teacher')

router.get('/:id', teacherCtrl.teacher_show_get)

module.exports = router