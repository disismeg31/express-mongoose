let teacher = require("./../models/teacher"); // require the schema inside the controller


function getTeachers(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  teacher
    .find({}, { _id: 0, name: 1, age: 1 })
    .skip(skip)
    .limit(limit)
    .then((result) =>
      res.json({
        message: `Got Page ${page} Teachers 😉`,
        payload: result,
        status: true,
      })
    )
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function getTeacherByName(req, res) {
  teacher
    .find({ name: new RegExp(`^${req.query.name}$`, "i") })
    .then((result) => {
      if (result.length > 0) {
        console.log(result);
        res.json({
          message: `Got the Teacher with name : ${req.query.name} 😉`,
          payload: result,
          status: true,
        });
      } else {
        res.json({
          message: `Send a name as query ?name=name_to_search`,
          payload: result,
          status: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: `Couldn't find the teacher with the name : ${req.query.name}`,
        status: false,
      });
    });
}

function getTeacherByAlphabeticOrderOfName(req, res) {
  teacher
    .find({}, null, { sort: { name: 1 } })
    .then((result) => {
      console.log(result);
      res.json({
        message: `Got the Teachers in alphabetic order of name😉`,
        payload: result,
        status: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: `Couldn't get the teachers in alphabetic order`,
        status: false,
      });
    });
}

function getTeacherByPlace(req,res){
  let {place} = req.body;
  if(place){
    teacher.findOne({place:new RegExp(`^${place}$`, "i")})
  .then((result)=>{
    console.log(result);
      res.json({
        message: `Got the Teachers from the place ${place}😉`,
        payload: result,
        status: true,
      });
  })
  .catch((err) => {
    console.log(err);
    res.json({
      message: `Couldn't get the teacher from the place ${place}`,
      status: false,
    });
  })
  }
  else{
    res.json({
      message: `Please enter the place in the body : "place":"place_name" `,
      status: false,
    });
  }
}

function getTeacherByLowestSalaryOrder(req, res) {
  teacher
    .find({}, null, { sort: { salary: 1 } })
    .then((result) => {
      console.log(result);
      res.json({
        message: `Got the Teachers in lowest salary order😉`,
        payload: result,
        status: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: `Couldn't get the teachers Teachers in lowest salary order`,
        status: false,
      });
    });
}

function insertTeacher(req, res) {
  let dataToInsert = req.body;
  console.log(dataToInsert);
    teacher.find({ name: new RegExp(`^${dataToInsert.name}$`, "i") })
      .then((result) => {
        if (result.length > 0) {
          console.log("Duplicate found:", result);
          res.json({
            message: "Teacher with this name already exists ❗❗",
            status: false,
          });
        } else {
          teacher
            .create(dataToInsert)
            .then((createdDoc) => {
              console.log("1 document inserted");
              const { _doc } = createdDoc;
              const { _id,__v, ...dataToDisplay } = _doc;
              res.json({
                message: "Insertion to collection successful✅",
                payload: dataToDisplay,
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

function getAverageSalary(req, res) {
  teacher
    .find({})
    .then((result) => {
      let avg = 0;
      let sumOfSalary = 0;
      result.forEach((record) => {
        sumOfSalary += record.salary;
      });
      avg = Number((sumOfSalary / result.length).toFixed(0));
      res.json({
        message: "Average salary of teachers",
        payload: avg,
        status: true,
      });
    })
    .catch((err) => {
      res.json({
        message: "Couldn't get the salary details",
        status: false,
      });
    });
}

function getCountOfUnmarriedTeachers(req,res){
  teacher.find({status:"unmarried"})
  .then((data)=>{
    let count = data.length;
    res.json({
      message: "Count of unmarried teachers",
      payload: count,
      status: true,
    });
  })
  .catch((err) => {
    res.json({
      message: "Couldn't get the marital status details",
      status: false,
    });
  })
}

function getCountOfMarriedTeachers(req,res){
  teacher.find({status:"married"})
  .then((data)=>{
    let count = data.length;
    res.json({
      message: "Count of married teachers",
      payload: count,
      status: true,
    });
  })
  .catch((err) => {
    res.json({
      message: "Couldn't get the marital status details",
      status: false,
    });
  })
}

function getOldestTeacher(req, res) {
  teacher
    .find({})
    .then((result) => {
      const ages = result.map((teacher) => teacher.age);
      let largestAge = Math.max(...ages);
      let teacherIs = result.find((teacher) => teacher.age === largestAge);
      res.json({
        message: "The oldest teacher is:",
        payload: teacherIs,
        status: true,
      });
    })
    .catch((err) => {
      res.json({
        message: "Couldn't get the data for calculation",
        status: false,
      });
    });
}

function getYoungestTeacher(req, res) {
  teacher
    .find({})
    .then((result) => {
      const ages = result.map((teacher) => teacher.age);
      const smallestAge = Math.min(...ages);
      let youngestIs = result.find((teacher) => teacher.age === smallestAge);
      res.json({
        message: "The youngest teacher is:",
        payload: youngestIs,
        status: true,
      });
    })
    .catch((err) => {
      res.json({
        message: "Couldn't get the data for calculation",
        status: false,
      });
    });
}

function getMostSalariedTeacher(req, res) {
  teacher
    .find({})
    .then((result) => {
      const salaries = result.map((teacher) => teacher.salary);
      const largestSalary = Math.max(...salaries);
      let teacherWithMostSalary = result.find(
        (teacher) => teacher.salary === largestSalary
      );
      res.json({
        message: "The most salried teacher is:",
        payload: teacherWithMostSalary,
        status: true,
      });
    })
    .catch((err) => {
      res.json({
        message: "Couldn't get the data for calculation",
        status: false,
      });
    });
}

function getAverageAgeOfTeachers(req, res) {
  teacher
    .find({})
    .then((result) => {
      let avg = 0;
      let sumOfAge = 0;
      result.forEach((record) => {
        sumOfAge += record.age;
      });
      avg = Number((sumOfAge / result.length).toFixed(0));
      res.json({
        message: "Average age of teachers",
        payload: avg,
        status: true,
      });
    })
    .catch((err) => {
      res.json({
        message: "Couldn't get the data for calculation",
        status: false,
      });
    });
}

function updateTeacherUsingId(req, res) {
  let dataToUpdate = req.body;
  let updateId = req.query.id;
  console.log("id to update: ", updateId.name);
  if (updateId) {
      teacher.find({ _id: updateId })
      .then((data)=>{
        if (data.length > 0) {
          teacher.findByIdAndUpdate(
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
           message: `Couldn't get the teacher of id: ${updateId.id} data`,
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
function updateTeacherByName(req, res) {
  let dataToUpdate = req.body;
  let ogName = req.query;
  console.log("Name to update: ", ogName.name);
  if (ogName) {
    let regexName = new RegExp(`^${ogName.name}$`, "i");
      teacher.find({ name: regexName })
      .then((data)=>{
        if (data.length > 0) {
          teacher.updateOne(
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
          message: `Couldn't get the teacher name ${ogName.name} data`,
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

function deleteTeacherByName(req, res) {
    let nameToDelete = req.query;
    let regexName = new RegExp(`^${nameToDelete.name}$`, "i");
    if (nameToDelete.name) {
        teacher.find({ name: regexName })
        .then((data)=>{
          let dataGotDeleted = data;
          teacher.deleteOne({ name: regexName })
              .then((result)=>{
                console.log("Result"+ JSON.stringify(result),"\nDeleted Data"+dataGotDeleted);
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
              .catch((err)=>{
                res.json({
                  message: `Error in the query/db etc`,
                  status: false,
                });
              })
        })
        .catch((err)=>{
            console.log("Error", err);
            res.json({
              message: "db/syntaxt Error while checking for if name exists",
              status: false,
            });
        })  
    } 
    else {
      res.json({
        message: ` Please Provide name (existing name) to delete data ❌`,
        status: false,
      }); 
    }
  }

function deleteTeacherById(req, res) {
    let idToDelete = req.query;
    teacher.find({ _id:idToDelete.id})
      .then((data)=>{
        if (data.length > 0) {
          let dataGotDeleted = data;
          teacher.findByIdAndDelete({_id:idToDelete.id})
          .then((result)=>{
            console.log("Result", result);
                res.json({
                  message: `Deleted records of id: ${idToDelete.id} Sucessfully!!!✅`,
                  payload: dataGotDeleted,
                  status: true,
                });
          })
          .catch((err)=>{
                res.json({
                  message: `Error in the query/db etc`,
                  status: false,
                });
          })
        } 
        else {
          res.json({
            message: `Couldn't get the student id: ${idToDelete.id} data ❌`,
            status: false,
          });
        }

      })
    .catch((err)=>{
        console.log("Error", err);
        res.json({
            message: "Error checking for if id exists",
            status: false,
          });
      })
}



module.exports = {
  getTeachers,
  getTeacherByName,
  getTeacherByAlphabeticOrderOfName,
  getTeacherByLowestSalaryOrder,
  getCountOfUnmarriedTeachers,
  getCountOfMarriedTeachers,
  getTeacherByPlace,
  insertTeacher,
  updateTeacherUsingId,
  updateTeacherByName,
  deleteTeacherByName,
  deleteTeacherById,
  getAverageSalary,
  getOldestTeacher,
  getYoungestTeacher,
  getMostSalariedTeacher,
  getAverageAgeOfTeachers,
};
