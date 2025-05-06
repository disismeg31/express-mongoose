const mongoose = require('mongoose');
const CONSTANTS = require('./../shared/constants')
const dbUrl = 'mongodb://localhost:27017/csbatch';

mongoose.connect(CONSTANTS.MongoDBUrl+CONSTANTS.mongoDBPort+CONSTANTS.mongoDBName)
.then(() => {
    console.log("Connection created...");
})
.catch(err=> {
    console.log("Connection not created..", err);
})