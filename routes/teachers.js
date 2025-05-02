const express = require('express');
let router = express.Router();
let teacherController = require('./../controllers/teacher.controller');

router.route('/getTeachers').get(teacherController.getTeachers);

router.route('/insertTeacher').post(teacherController.insertTeacher);

router.route('/getAverageSalary').get(teacherController.getAverageSalary);

router.route('/getOldestTeacher').get(teacherController.getOldestTeacher);

router.route('/getYoungestTeacher').get(teacherController.getYoungestTeacher);

router.route('/getMostSalariedTeacher').get(teacherController.getMostSalariedTeacher);

router.route('/getAverageAgeOfTeachers').get(teacherController.getAverageAgeOfTeachers);

router.route('/getTeacherByName').get(teacherController.getTeacherByName);

router.route('/getTeacherByAlphabeticOrderOfName').get(teacherController.getTeacherByAlphabeticOrderOfName);

router.route('/getTeacherByLowestSalaryOrder').get(teacherController.getTeacherByLowestSalaryOrder);

router.route('/getCountOfUnmarriedTeachers').get(teacherController.getCountOfUnmarriedTeachers);

router.route('/getCountOfMarriedTeachers').get(teacherController.getCountOfMarriedTeachers);

router.route('/getTeacherByPlace').get(teacherController.getTeacherByPlace);

router.route('/updateTeacherUsingId').put(teacherController.updateTeacherUsingId);

router.route('/updateTeacherByName').put(teacherController.updateTeacherByName);

router.route('/deleteTeacherByName').delete(teacherController.deleteTeacherByName);

router.route('/deleteTeacherById').delete(teacherController.deleteTeacherById);

module.exports = router;