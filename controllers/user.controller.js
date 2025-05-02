let user = require("./../models/user"); // require the schema inside the controller
let Response =require("./../shared/response");

function getUsers(req, res) {
  let response = new Response();
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  user
    .find({}, { _id: 0, name: 1, age: 1 })
    .skip(skip)
    .limit(limit)
    .then((result) =>{
      response.setMessage(`Got Page ${page} Users 😉`);
      response.setPayload(result);
      response.setSuccess(true);
      res.json(response); 
      }
    )
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function insertUser(req, res) {
  let response = new Response();
  let dataToInsert = req.body;
  console.log(dataToInsert);
  user
    .find({ name: new RegExp(`^${dataToInsert.name}$`, "i") })
    .then((data) => {
      if (data.length > 0) {
        //dup found
        console.log("Duplicate found:", data);
        response.setMessage("User with this name already exists ❗❗");
        response.setSuccess(false);
        res.json(response)
      } else {
        user.create(dataToInsert)
          .then((result) => {
            console.log("1 document inserted");
            const { _id, ...dataOnly } = dataToInsert;
            response.setMessage("Insertion to collection successful✅");
            response.setPayload(dataOnly);
            response.setSuccess(true);
            res.json(response);
          })
          .catch((err) => {
            console.log("Error", err);
            response.setMessage("Couldn't insert to collection");
            response.setPayload(err);
            response.setSuccess(false);
            res.json(response)
          });
      }
    })
    .catch((err) => {
      console.log("Error", err);
      response.setMessage("Error checking for duplicates");
      response.setSuccess(false);
      res.json(response)
    });
}

function getFailedStudents(req, res) {
  let response = new Response();
      user.find({ marks: { $lt: 18 } })
      .then((data)=>{
        let failedStudents = data;
          response.setMessage("The students who failed are:");
          response.setPayload(failedStudents);
          response.setSuccess(true);
          res.json(response)
      })
      .catch((err)=> {
        response.setMessage("Couldn't get the failed students data");
        response.setSuccess(false);
        res.json(response);
      })
}

function getPassedStudents(req, res) {
  let response = new Response();
      user.find({ marks: { $gte: 18 } },{ name: 1, _id: 0,marks:1 } )
      .then((data)=>{
        let failedStudents = data;
        response.setMessage("The names students who passed are:");
        response.setPayload(failedStudents);
        response.setSuccess(true);
        res.json(response);
      })
      .catch((err)=> {
        response.setMessage("Couldn't get the passed students data");
        response.setSuccess(false);
        res.json(response);
      })
}

function getAverageAgeOfStudents(req, res) {
  let response = new Response();
      user.find({})
      .then((data)=>{
        let ages = data.map((student) => student.age);
          let sumOfAges = ages.reduce((a, c) => a + c, 0);
          let averageAgeIs = Number((sumOfAges / ages.length).toFixed(0));
          response.setMessage("The average age of students in cs batch is :");
          response.setPayload(averageAgeIs);
          response.setSuccess(true);
          res.json(response);
      })
      .catch((err) =>{
        response.setMessage("Couldn't get the students age data");
        response.setSuccess(false);
        res.json(response);
      })
}

function deleteByName(req, res) {
  let response = new Response();
  let nameToDelete = req.query;
  let regexName = new RegExp(`^${nameToDelete.name}$`, "i");
  if (nameToDelete.name) {
    user
      .find({ name: regexName })
      .then((data) => {
        let dataGotDeleted = data;
        user
          .deleteOne({ name: regexName })
          .then((result) => {
            console.log(
              "Result" + JSON.stringify(result),
              "\nDeleted Data" + dataGotDeleted
            );
            if (result.deletedCount) {
              response.setMessage(`Deleted records of ${nameToDelete.name} Sucessfully!!!✅`);
              response.setPayload(dataGotDeleted);
              response.setSuccess(true);
              res.json(response);
            } else {
              response.setMessage(`Already Deleted/No records of name: ${nameToDelete.name}`);
              response.setPayload(dataGotDeleted);
              response.setSuccess(false);
              res.json(response);
            }
          })
          .catch((err) => {
            response.setMessage(`Error in the query/db etc`);
            response.setSuccess(false);
            res.json(response);
          });
      })
      .catch((err) => {
        console.log("Error", err);
        response.setMessage("db/syntaxt Error while checking for if name exists");
        response.setSuccess(false);
        res.json(response);
      });
  } else {
    response.setMessage(` Please Provide name (existing name) to delete data ❌`);
    response.setSuccess(false)
    res.json(response);
  }
}

function deleteById(req, res) {
  let response = new Response();
  let idToDelete = req.query;
  user
    .find({ _id: idToDelete.id })
    .then((data) => {
      if (data.length > 0) {
        let dataGotDeleted = data;
        user
          .findByIdAndDelete({ _id: idToDelete.id })
          .then((result) => {
            console.log("Result", result);
            response.setMessage(`Deleted records of id: ${idToDelete.id} Sucessfully!!!✅`);
            response.setPayload(dataGotDeleted);
            response.setSuccess(true);
            res.json(response);
          })
          .catch((err) => {
            response.setMessage(`Error in the query/db etc`);
            response.setSuccess(false);
            res.json(response);
          });
      } else {
        response.setMessage(`Couldn't get the student id: ${idToDelete.id} data ❌`);
        response.setSuccess(false);
        res.json(response);
      }
    })
    .catch((err) => {
      console.log("Error", err);
      response.setMessage("Error checking for if id exists");
      response.setSuccess(false);
      res.json(response);
    });
}

function updateUsingId(req, res) {
    let response = new Response();
    let dataToUpdate = req.body;
    let updateId = req.query.id;
    console.log("id to update: ", updateId.name);
    if (updateId) {
        user.find({ _id: updateId })
        .then((data)=>{
          if (data.length > 0) {
            user.findByIdAndUpdate(
                updateId,
               { $set: dataToUpdate },
               { new: true })
             .then((result)=>{
               console.log("Result", result);
               let updated_result = result;
               response.setMessage(`Update Sucessfull!!!✅ updated ${data.name} data with:`);
               response.setPayload(updated_result);
               response.setSuccess(true);
               res.json(response);
             })
             .catch((err) =>{
              response.setMessage(`Error in the query/db etc`);
              response.setSuccess(false);
              res.json(response);
             })  
         } 
         else {
          response.setMessage(`Couldn't get the student of id: ${updateId.id} data`);
          response.setSuccess(false);
          res.json(response);
         }
        })
        .catch((err) =>{
          console.log("Error", err);
          response.setMessage("Error checking for if id exists");
          response.setSuccess(false);
          res.json(response);
        });  
    } else {
      response.setMessage(`Please provide the id(existing) and data to update in the body`);
      response.setSuccess(false);
      res.json(response);
    }
}
// {name:{$regex:`^${startingLetter}`,$options:"i"}}
function updateByName(req, res) {
    let response = new Response();
    let dataToUpdate = req.body;
    let ogName = req.query;
    console.log("Name to update: ", ogName.name);
    if (ogName) {
      let regexName = new RegExp(`^${ogName.name}$`, "i");
        user.find({ name: regexName })
        .then((data)=>{
          if (data.length > 0) {
            user.updateOne(
              { name: regexName },
              { $set: dataToUpdate },
               )
            .then((result)=>{
              console.log("Result", result);
              response.setMessage(`Update Sucessfull!!!✅ updated ${ogName.name} data with:`);
              response.setPayload(dataToUpdate);
              response.setSuccess(true);
              res.json(response);
            })
            .catch((err) =>{
              response.setMessage(`Error in the query/db etc`);
              response.setSuccess(false);
              res.json(response);
            });
          } 
          else {
            response.setMessage(`Couldn't get the student name ${ogName.name} data`);
            response.setSuccess(false);
            res.json(response);
          }
        })
        .catch((err)=> {
          console.log("Error", err);
          response.setMessage("Error checking for if name exists");
          response.setSuccess(false);
          res.json(response);
        }) 
    } 
    else {
      response.setMessage(`Please provide the name (that exists - old name) and data to update in the body`);
      response.setSuccess(false);
      res.json(response);
    }
}

module.exports = {
  getUsers,
  insertUser,
  getFailedStudents,
  getPassedStudents,
  getAverageAgeOfStudents,
  updateByName,
  deleteByName,
  deleteById,
  updateUsingId,
};
