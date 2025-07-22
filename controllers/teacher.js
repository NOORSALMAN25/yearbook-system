const User = require('../models/User')
const Post = require('../models/Post')

exports.teacher_edit= async(req , res)=>{
//   const ifTeacher = await User.findById(req.session.user.id)
// if (ifTeacher.role === 'teacher'){
// res.render('user/teacherEdit.ejs', { ifTeacher })
// }
const remove = await User.find({})
console.log('remove', remove)

}