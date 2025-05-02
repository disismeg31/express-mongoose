const mongoose = require('mongoose');
const constants = require('./shared/constants')
const dbUrl = 'mongodb://localhost:27017/csbatch';

mongoose.connect(constants.MongoDBUrl+constants.mongoDBPort+constants.mongoDBName)
.then(() => {
    console.log("Connection created...");
})
.catch(err=> {
    console.log("Connection not created..", err);
})