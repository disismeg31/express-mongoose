const mongoose = require('mongoose');
const CONSTANTS = require('./../shared/constants');
let Teacher = require("./../models/teacher");

//import response.js
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter name"],
        minLength:[3,"Name should be 3 or more letters"]
    },
    age: {
        type:Number,
        required:[true,"Please enter age"],
        min: [14, "Age should be within range 14-100"],
        max: [100, "Age should be within range 14-100"]
    },
    place:{
        type:String,
        required:[true,"Please enter place"]
    },
    status:{
        type:String,
        required:[true,"Please enter status"]
    },
    marks: {
        type:Number,
        required:[true,"Please enter marks"],
        min:[0,"Mark should be within range 0 - 50"],
        max:[50,"Mark should be within range 0 - 50"]
    },
    gender:{
        type:String,
        required:[true,"Please enter gender"],
        enum:{
            values: ['MALE', 'FEMALE'],
            message: 'gender must be either "MALE" or "FEMALE"'
        }
    },
    createdBy:{
        type:String
    },
    updatedBy:{
        type:String
    },
    updatedAt:{
        type:Date
    }
});

//next means before the adding to db it will get into that fn 
userSchema.pre('save',function(next){
    console.log('Before saving user:', this);
    Teacher.find({})
    .then((result)=>{
        console.log("Result",result);
        this.set({createdBy:result[0]._id});
    })
    .catch((err)=>{console.log(err)})
    .finally(()=>{
        next();
    })   
})

userSchema.pre('updateOne', function(next){
    Teacher.find({})
    .then((result) => {
      this.setUpdate({
        ...(this.getUpdate() || {}),
        updatedBy: result[0].name,
        updatedAt: new Date()
      });
    })
    .catch( (err)=>{
        console.error("Error fetching teacher:", err);
      // Optionally pass error to next to halt the operation
      return next(err);
    })
    .finally(() => {
        next(); // Called once, after either then or catch
    });
})


const User = mongoose.model(CONSTANTS.collectionName.users_collection, userSchema);
module.exports = User;