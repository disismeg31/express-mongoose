const CONSTANTS = require('./../shared/constants');
const express = require('express');
let router = express.Router();
let teacherController = require('./../controllers/teacher.controller');

router.route(CONSTANTS.subUrls.teachers.Insert_Teacher).post(teacherController.insertTeacher);

router.route(CONSTANTS.subUrls.teachers.Get_Teachers).get(teacherController.getTeachers);

router.route(CONSTANTS.subUrls.teachers.Get_Average_Salary).get(teacherController.getAverageSalary);

router.route(CONSTANTS.subUrls.teachers.Get_Oldest_Teacher).get(teacherController.getOldestTeacher);

router.route(CONSTANTS.subUrls.teachers.Get_Youngest_Teacher).get(teacherController.getYoungestTeacher);

router.route(CONSTANTS.subUrls.teachers.Get_Most_Salaried_Teacher).get(teacherController.getMostSalariedTeacher);

router.route(CONSTANTS.subUrls.teachers.Get_Average_Age_Of_Teachers).get(teacherController.getAverageAgeOfTeachers);

router.route(CONSTANTS.subUrls.teachers.Get_Teacher_By_Name).get(teacherController.getTeacherByName);

router.route(CONSTANTS.subUrls.teachers.Get_Teacher_By_Alphabetic_Order_Of_Name).get(teacherController.getTeacherByAlphabeticOrderOfName);

router.route(CONSTANTS.subUrls.teachers.Get_Teacher_By_Lowest_Salary_Order).get(teacherController.getTeacherByLowestSalaryOrder);

router.route(CONSTANTS.subUrls.teachers.Get_Count_Of_Unmarried_Teachers).get(teacherController.getCountOfUnmarriedTeachers);

router.route(CONSTANTS.subUrls.teachers.Get_Count_Of_Married_Teachers).get(teacherController.getCountOfMarriedTeachers);

router.route(CONSTANTS.subUrls.teachers.Get_Teacher_By_Place).get(teacherController.getTeacherByPlace);

router.route(CONSTANTS.subUrls.teachers.Update_Teacher_Using_Id).put(teacherController.updateTeacherUsingId);

router.route(CONSTANTS.subUrls.teachers.Update_Teacher_By_Name).put(teacherController.updateTeacherByName);

router.route(CONSTANTS.subUrls.teachers.Delete_Teacher_By_Name).delete(teacherController.deleteTeacherByName);

router.route(CONSTANTS.subUrls.teachers.Delete_Teacher_By_Id).delete(teacherController.deleteTeacherById);

module.exports = router;