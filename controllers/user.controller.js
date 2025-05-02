let user = require("./../models/user"); // require the schema inside the controller

function getUsers(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  user
    .find({}, { _id: 0, name: 1, age: 1 })
    .skip(skip)
    .limit(limit)
    .then((result) =>
      res.json({
        message: `Got Page ${page} Users 😉`,
        payload: result,
        status: true,
      })
    )
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function insertUser(req, res) {
  let dataToInsert = req.body;
  console.log(dataToInsert);
  user
    .find({ name: new RegExp(`^${dataToInsert.name}$`, "i") })
    .then((data) => {
      if (data.length > 0) {
        //dup found
        console.log("Duplicate found:", data);
        res.json({
          message: "User with this name already exists ❗❗",
          status: false,
        });
      } else {
        user.create(dataToInsert)
          .then((result) => {
            console.log("1 document inserted");
            const { _id, ...dataOnly } = dataToInsert;
            res.json({
              message: "Insertion to collection successful✅",
              payload: dataOnly,
              status: true,
            });
          })
          .catch((err) => {
            console.log("Error", err);
            res.json({
              message: "Couldn't insert to collection",
              payload:err,
              status: false,
            });
          });
      }
    })
    .catch((err) => {
      console.log("Error", err);
      res.json({
        message: "Error checking for duplicates",
        status: false,
      });
    });
}

function getFailedStudents(req, res) {
      user.find({ marks: { $lt: 18 } })
      .then((data)=>{
        let failedStudents = data;
          res.json({
            message: "The students who failed are:",
            payload: failedStudents,
            status: true,
          });
      })
      .catch((err)=> {
        res.json({
          message: "Couldn't get the failed students data",
          status: false,
        });
      })
}

function getPassedStudents(req, res) {
      user.find({ marks: { $gte: 18 } },{ name: 1, _id: 0,marks:1 } )
      .then((data)=>{
        let failedStudents = data;
        res.json({
          message: "The names students who passed are:",
          payload: failedStudents,
          status: true,
        });
      })
      .catch((err)=> {
        res.json({
          message: "Couldn't get the passed students data",
          status: false,
        });
      })
}

function getAverageAgeOfStudents(req, res) {
      user.find({})
      .then((data)=>{
        let ages = data.map((student) => student.age);
          let sumOfAges = ages.reduce((a, c) => a + c, 0);
          let averageAgeIs = Number((sumOfAges / ages.length).toFixed(0));
          res.json({
            message: "The average age of students in cs batch is :",
            payload: averageAgeIs,
            status: true,
          });
      })
      .catch((err) =>{
        res.json({
          message: "Couldn't get the students age data",
          status: false,
        });
      })
}

function deleteByName(req, res) {
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
              res.json({
                message: `Deleted records of ${nameToDelete.name} Sucessfully!!!✅`,
                payload: dataGotDeleted,
                status: true,
              });
            } else {
              res.json({
                message: `Already Deleted/No records of name: ${nameToDelete.name}`,
                payload: dataGotDeleted,
                status: false,
              });
            }
          })
          .catch((err) => {
            res.json({
              message: `Error in the query/db etc`,
              status: false,
            });
          });
      })
      .catch((err) => {
        console.log("Error", err);
        res.json({
          message: "db/syntaxt Error while checking for if name exists",
          status: false,
        });
      });
  } else {
    res.json({
      message: ` Please Provide name (existing name) to delete data ❌`,
      status: false,
    });
  }
}

function deleteById(req, res) {
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
            res.json({
              message: `Deleted records of id: ${idToDelete.id} Sucessfully!!!✅`,
              payload: dataGotDeleted,
              status: true,
            });
          })
          .catch((err) => {
            res.json({
              message: `Error in the query/db etc`,
              status: false,
            });
          });
      } else {
        res.json({
          message: `Couldn't get the student id: ${idToDelete.id} data ❌`,
          status: false,
        });
      }
    })
    .catch((err) => {
      console.log("Error", err);
      res.json({
        message: "Error checking for if id exists",
        status: false,
      });
    });
}

function updateUsingId(req, res) {
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
                   res.json({
                     message: `Update Sucessfull!!!✅ updated ${data.name} data with:`,
                     payload: updated_result,
                     status: true,
                   });
             })
             .catch((err) =>{
               res.json({
                 message: `Error in the query/db etc`,
                 status: false,
               });
             })  
         } 
         else {
           res.json({
             message: `Couldn't get the student of id: ${updateId.id} data`,
             status: false,
           });
         }
        })
        .catch((err) =>{
          console.log("Error", err);
          res.json({
            message: "Error checking for if id exists",
            status: false,
          });
        });  
    } else {
      res.json({
        message: `Please provide the id(existing) and data to update in the body`,
        status: false,
      });
    }
}
// {name:{$regex:`^${startingLetter}`,$options:"i"}}
function updateByName(req, res) {
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
              res.json({
                message: `Update Sucessfull!!!✅ updated ${ogName.name} data with:`,
                payload: dataToUpdate,
                status: true,
              });
            })
            .catch((err) =>{
              res.json({
                message: `Error in the query/db etc`,
                status: false,
              });
            });
          } 
          else {
          res.json({
            message: `Couldn't get the student name ${ogName.name} data`,
            status: false,
          });
          }
        })
        .catch((err)=> {
          console.log("Error", err);
          res.json({
            message: "Error checking for if name exists",
            status: false,
          });
        }) 
    } 
    else {
      res.json({
        message: `Please provide the name (that exists - old name) and data to update in the bidy`,
        status: false,
      });
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
