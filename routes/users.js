const express = require('express');
let router = express.Router();
let studentController = require('./../controllers/user.controller');

router.route('/getUsers').get(studentController.getUsers);

router.route('/insertUser').post(studentController.insertUser);

router.route('/getFailedStudents').get(studentController.getFailedStudents);

router.route('/getPassedStudents').get(studentController.getPassedStudents);

router.route('/getAverageAgeOfStudents').get(studentController.getAverageAgeOfStudents);

router.route('/updateByName').patch(studentController.updateByName);

router.route('/deleteByName').delete(studentController.deleteByName);

router.route('/deleteById').delete(studentController.deleteById);

router.route('/updateUsingId').patch(studentController.updateUsingId);

module.exports = router;