const express = require('express');
const mongooseConfig = require('./config/mongoose');
const CONSTANTS = require('./shared/constants');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
const port =CONSTANTS.PORT;

let indexRouter = require('./routes/index.routes');
app.use('',indexRouter);

app.listen(port,()=>{
    console.log(`Express app listening at port ${port}`)
})
