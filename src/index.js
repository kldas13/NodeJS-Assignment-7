const express = require('express');
const data = require('./InitialData');
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());


// install mongoose
const mongoose =require('mongoose');


const studentRoute=require('./routes/student');


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// your code goes here

app.use('/',studentRoute);

mongoose.connect("mongodb://localhost/student",()=> {
    console.log("Connected to Student DB");
});





app.listen(port, () => console.log(`App listening on port ${port}!`))


module.exports = app;
