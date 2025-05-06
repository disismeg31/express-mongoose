const CONSTANTS = require('./../shared/constants');
const express = require('express');
let router = express.Router();
let studentController = require('./../controllers/user.controller');

router.route(CONSTANTS.subUrls.users.Insert_User).post(studentController.insertUser);

router.route(CONSTANTS.subUrls.users.Get_Users).get(studentController.getUsers);

router.route(CONSTANTS.subUrls.users.Get_Failed_Students).get(studentController.getFailedStudents);

router.route(CONSTANTS.subUrls.users.Get_Passed_Students).get(studentController.getPassedStudents);

router.route(CONSTANTS.subUrls.users.Get_Average_Age_Of_Students).get(studentController.getAverageAgeOfStudents);

router.route(CONSTANTS.subUrls.users.Update_By_Name).patch(studentController.updateByName);

router.route(CONSTANTS.subUrls.users.Update_Using_Id).patch(studentController.updateUsingId);

router.route(CONSTANTS.subUrls.users.Delete_By_Name).delete(studentController.deleteByName);

router.route(CONSTANTS.subUrls.users.Delete_By_Id).delete(studentController.deleteById);

module.exports = router;