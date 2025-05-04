const express = require('express');
const config = require('./config');
const constants = require('./shared/constants');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
const port =constants.PORT;

let indexRouter = require('./routes/index.routes');
app.use('',indexRouter);

app.listen(port,()=>{
    console.log(`Express app listening at port ${port}`)
})
