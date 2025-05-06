let Teacher = require("./../models/teacher"); // require the schema inside the controller
let Response =require("./../shared/response");

function getTeachers(req, res) {
  let response = new Response();
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  Teacher
    .find({}, { _id: 0, name: 1, age: 1 })
    .skip(skip)
    .limit(limit)
    .then((result) =>{
      response.setMessage(`Got Page ${page} Teachers 😉`);
      response.setPayload(result);
      response.setSuccess(true)
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      response.setMessage('Error getting users');
      response.setPayload(err);
      response.setSuccess(false)
      res.json(response);
    });
}

function getTeacherByName(req, res) {
  let response = new Response();
  Teacher.find({ name: new RegExp(`^${req.query.name}$`, "i") })
    .then((result) => {
      if (result.length > 0) {
        console.log(result);
        response.setMessage(`Got the Teacher with name : ${req.query.name} 😉`);
        response.setPayload(result);
        response.setSuccess(true);
        res.json(response);
      } else {
        response.setMessage(`Send a name as query ?name=name_to_search`);
        response.setPayload(result);
        response.setSuccess(false);
        res.json(response);
      }
    })
    .catch((err) => {
      console.log(err);
      response.setMessage(`Couldn't find the teacher with the name : ${req.query.name}`);
      response.setSuccess(false);
      res.json(response);
    });
}

function getTeacherByAlphabeticOrderOfName(req, res) {
  let response = new Response();
  Teacher.find({}, null, { sort: { name: 1 } })
    .then((result) => {
      console.log(result);
      response.setMessage(`Got the Teachers in alphabetic order of name😉`);
      response.setPayload(result);
      response.setSuccess(true);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      response.setMessage(`Couldn't get the teachers in alphabetic order`);
      response.setSuccess(false);
      res.json(response);
    });
}

function getTeacherByPlace(req,res){
  let response = new Response();
  let {place} = req.body;
  if(place){
    Teacher.findOne({place:new RegExp(`^${place}$`, "i")})
  .then((result)=>{
    console.log(result);
    response.setMessage(`Got the Teachers from the place ${place}😉`);
    response.setPayload(result);
    response.setSuccess(true);
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
    response.setMessage(`Couldn't get the teacher from the place ${place}`);
    response.setSuccess(false);
    res.json(response);
  })
  }
  else{
    response.setMessage(`Please enter the place in the body : "place":"place_name" `);
    response.setSuccess(false);
    res.json(response);
  }
}

function getTeacherByLowestSalaryOrder(req, res) {
  let response = new Response();
  Teacher.find({}, null, { sort: { salary: 1 } })
    .then((result) => {
      console.log(result);
      response.setMessage(`Got the Teachers in lowest salary order😉`);
      response.setPayload(result);
      response.setSuccess(true);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      response.setMessage(`Couldn't get the teachers Teachers in lowest salary order`);
      response.setSuccess(false);
      res.json(response);
    });
}

function insertTeacher(req, res) {
  let response = new Response();
  let dataToInsert = req.body;
  console.log(dataToInsert);
  Teacher.find({ name: new RegExp(`^${dataToInsert.name}$`, "i") })
      .then((result) => {
        if (result.length > 0) {
          console.log("Duplicate found:", result);
          response.setMessage("Teacher with this name already exists ❗❗");
          response.setSuccess(false);
          res.json(response);
        } else {
          Teacher
            .create(dataToInsert)
            .then((createdDoc) => {
              console.log("1 document inserted");
              const { _doc } = createdDoc;
              const { _id,__v, ...dataToDisplay } = _doc;
              response.setMessage("Insertion to collection successful✅");
              response.setPayload(dataToDisplay);
              response.setSuccess(true);
              res.json(response);
            })
            .catch((err) => {
              console.log("Error", err);
              response.setMessage("Couldn't insert to collection");
              response.setPayload(err);
              response.setSuccess(false);
              res.json(response);
            });
        }
      })
      .catch((err) => {
        console.log("Error", err);
        response.setMessage("Error checking for duplicates");
        response.setSuccess(false);
        res.json(response);
      });
}

function getAverageSalary(req, res) {
  let response = new Response();
  Teacher.find({})
    .then((result) => {
      let avg = 0;
      let sumOfSalary = 0;
      result.forEach((record) => {
        sumOfSalary += record.salary;
      });
      avg = Number((sumOfSalary / result.length).toFixed(0));
      response.setMessage("Average salary of teachers");
      response.setPayload(avg);
      response.setSuccess(true);
      res.json(response);
    })
    .catch((err) => {
      response.setMessage("Couldn't get the salary details");
      response.setSuccess(false);
      res.json(response);
    });
}

function getCountOfUnmarriedTeachers(req,res){
  let response = new Response();
  Teacher.find({status:"unmarried"})
  .then((data)=>{
    let count = data.length;
    response.setMessage("Count of unmarried teachers");
    response.setPayload(count);
    response.setSuccess(true);
    res.json(response);
  })
  .catch((err) => {
    response.setMessage("Couldn't get the marital status details");
    response.setSuccess(false);
    res.json(response);
  })
}

function getCountOfMarriedTeachers(req,res){
  let response = new Response();
  Teacher.find({status:"married"})
  .then((data)=>{
    let count = data.length;
    response.setMessage("Count of married teachers");
    response.setPayload(count);
    response.setSuccess(true);
    res.json(response);
  })
  .catch((err) => {
    response.setMessage("Couldn't get the marital status details");
    response.setSuccess(false);
    res.json(response);
  })
}

function getOldestTeacher(req, res) {
  let response = new Response();
  Teacher.find({})
    .then((result) => {
      const ages = result.map((teacher) => teacher.age);
      let largestAge = Math.max(...ages);
      let teacherIs = result.find((teacher) => teacher.age === largestAge);
      response.setMessage("The oldest teacher is:");
      response.setPayload(teacherIs);
      response.setSuccess(true);
      res.json(response);
    })
    .catch((err) => {
      response.setMessage("Couldn't get the data for calculation");
      response.setSuccess(false);
      res.json(response);
    });
}

function getYoungestTeacher(req, res) {
  let response = new Response();
  Teacher.find({})
    .then((result) => {
      const ages = result.map((teacher) => teacher.age);
      const smallestAge = Math.min(...ages);
      let youngestIs = result.find((teacher) => teacher.age === smallestAge);
      response.setMessage("The youngest teacher is:");
      response.setPayload(youngestIs);
      response.setSuccess(true);
      res.json(response);
    })
    .catch((err) => {
      response.setMessage("Couldn't get the data for calculation");
      response.setSuccess(false);
      res.json(response);
    });
}

function getMostSalariedTeacher(req, res) {
  let response = new Response();
  Teacher.find({})
    .then((result) => {
      const salaries = result.map((teacher) => teacher.salary);
      const largestSalary = Math.max(...salaries);
      let teacherWithMostSalary = result.find(
        (teacher) => teacher.salary === largestSalary
      );
      response.setMessage("The most salried teacher is:");
      response.setPayload(teacherWithMostSalary);
      response.setSuccess(true);
      res.json(response);
    })
    .catch((err) => {
      response.setMessage("Couldn't get the data for calculation");
      response.setSuccess(false);
      res.json(response);
    });
}

function getAverageAgeOfTeachers(req, res) {
  let response = new Response();
  Teacher.find({})
    .then((result) => {
      let avg = 0;
      let sumOfAge = 0;
      result.forEach((record) => {
        sumOfAge += record.age;
      });
      avg = Number((sumOfAge / result.length).toFixed(0));
      response.setMessage("Average age of teachers");
      response.setPayload(avg);
      response.setSuccess(true);
      res.json(response);
    })
    .catch((err) => {
      response.setMessage("Couldn't get the data for calculation");
      response.setSuccess(false)
      res.json(response);
    });
}

function updateTeacherUsingId(req, res) {
  let response = new Response();
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
        response.setMessage(`Couldn't get the teacher of id: ${updateId.id} data`);
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
function updateTeacherByName(req, res) {
  let response = new Response();
  let dataToUpdate = req.body;
  let ogName = req.query;
  console.log("Name to update: ", ogName.name);
  if (ogName) {
    let regexName = new RegExp(`^${ogName.name}$`, "i");
    Teacher.find({ name: regexName })
      .then((data)=>{
        if (data.length > 0) {
          Teacher.updateOne(
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
          response.setMessage(`Couldn't get the teacher name ${ogName.name} data`);
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

function deleteTeacherByName(req, res) {
    let response = new Response();
    let nameToDelete = req.query;
    let regexName = new RegExp(`^${nameToDelete.name}$`, "i");
    if (nameToDelete.name) {
      Teacher.find({ name: regexName })
        .then((data)=>{
          let dataGotDeleted = data;
          Teacher.deleteOne({ name: regexName })
              .then((result)=>{
                console.log("Result"+ JSON.stringify(result),"\nDeleted Data"+dataGotDeleted);
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
              .catch((err)=>{
                response.setMessage(`Error in the query/db etc`);
                response.setSuccess(false);
                res.json(response);
              })
        })
        .catch((err)=>{
            console.log("Error", err);
            response.setMessage("db/syntaxt Error while checking for if name exists");
            response.setSuccess(false);
            res.json(response);
        })  
    } 
    else {
      response.setMessage(`Please Provide name (existing name) to delete data ❌`);
      response.setSuccess(false);
      res.json(response); 
    }
  }

function deleteTeacherById(req, res) {
    let response = new Response();
    let idToDelete = req.query;
    Teacher.find({ _id:idToDelete.id})
      .then((data)=>{
        if (data.length > 0) {
          let dataGotDeleted = data;
          Teacher.findByIdAndDelete({_id:idToDelete.id})
          .then((result)=>{
            console.log("Result", result);
            response.setMessage(`Deleted records of id: ${idToDelete.id} Sucessfully!!!✅`);
            response.setPayload(dataGotDeleted);
            response.setSuccess(true);
            res.json(response);
          })
          .catch((err)=>{
            response.setMessage(`Error in the query/db etc`);
            response.setSuccess(false);
            res.json(response);
          })
        } 
        else {
          response.setMessage(`Couldn't get the student id: ${idToDelete.id} data ❌`);
          response.setSuccess(false);
          res.json(response);
        }

      })
    .catch((err)=>{
        console.log("Error", err);
        response.setMessage("Error checking for if id exists");
        response.setSuccess(false);
        res.json(response);
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
