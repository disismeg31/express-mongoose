const express = require('express');
let router = express.Router();
let userRouter = require('./users');
let teacherRouter = require('./teachers');
const constants = require('./../shared/constants')

router.get('/',function(req,res){
    // res.json("App ready");
    let data={
        api_prefix:'teachers',
        apis:['/getTeachers','/getTeacherByName','/getTeacherByPlace','/deleteTeacherByName','/updateTeacherByName']
    }
    res.render('home',{data:data})
})

router.use(constants.URLS.USERS_PREFIX,userRouter);

router.use(constants.URLS.TEACHERS_PREFIX,teacherRouter);

module.exports = router