const mongoose = require('./connection');
const certificateSchema = new mongoose.Schema({
    name:{type:String,required:true},
    issuedOn:{type:Date,required:true},
    event:String,
    collegeName:String,
    collegeCity:String,
    technologies:[String]
});
const Certificate = mongoose.model("Certificates",certificateSchema);
module.exports = Certificate;