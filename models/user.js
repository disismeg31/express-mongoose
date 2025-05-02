const mongoose = require('mongoose');
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
    }
    // createdDAte:{
    //     type:Date
    // }
});

//next means before the adding to db it will get into that fn 
// userSchema.pre('save',function(next){
//     this.createdDate = new Date();
//     next()
// })
const User = mongoose.model('students', userSchema);

module.exports = User;