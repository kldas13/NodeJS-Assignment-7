const mongoose = require ('mongoose');


const listSchema = new mongoose.Schema({
    id : {type:Number, required:true},
    name : {type:String, required:true},
    currentClass : {type:Number, required:true},
    division : {type:String, required:true}
});

const Student = mongoose.model('Student',listSchema);

module.exports = Student;