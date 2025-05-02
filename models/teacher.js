const mongoose = require('mongoose');
const constants = require('./../shared/constants');

const teacherSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter name"],
        minLength:[3,"Name should be 3 or more letters"]
    },
    age: {
        type:Number,
        required:[true,"Please enter age"],
        min: [20, "age should be within range 20-60"],
        max: [60, "age should be within range 20-60"]
    },
    subject:{
        type:String,
        required:[true,"please enter subject"],
        minLength:[3,"subject should be 3 or more letters"]
    },
    salary:{
        type:Number,
        required:true,
        min:[10000,"salary should be within range 10000 - 100000"],
        max:[100000,"salary should be within range 10000 - 100000"]
    },
    status:{
        type:String,
        required:[true,"please enter marital status: married/unmarried"],
        enum:{
            values: ['married', 'unmarried'],
            message: 'status must be either "married" or "unmarried"'
        }
    },
    place:{
        type:String,
        required:[true,"please enter place"],
        minLength:[3,"place should be 3 or more letters"]
    },
    phone: {
        type: String,
        required: [true, "Please enter phone number"],
        match: [
          /^[6-9]\d{9}$/,
          "Please enter a valid 10-digit Indian phone number"
        ]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true, // Creates a unique index in the DB
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address"
        ]
      }

});

const Teacher = mongoose.model(constants.collectionName.teachers_collection, teacherSchema); // collection_name & schema

module.exports = Teacher;