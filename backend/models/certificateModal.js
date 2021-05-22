const mongoose = require('./connection');
const certificateSchema = new mongoose.Schema({
    name:{type:String,required:true},
    issuedOn:{type:Date,required:true},
    event:{type:String,required:true},
    collegeName:{type:String,required:true},
    collegeCity:{type:String,required:true},
    technologies:[String],
    validTill:{type:Date,required:true}
});
const Certificate = mongoose.model("Certificates",certificateSchema);
// const certi1 = new Certificate({
//     name:"Sooraj Shukla",
//     issuedOn:Date.now(),
//     event:"Buildathon",
//     collegeName:"Bundelkhand Institute of Engineering and Technology",
//     collegeCity:"Jhansi",
//     validTill:new Date(Date.now()+1000*60*60*24*30*8)
// })
// const certi2 = new Certificate({
//     name:"Sooraj Shukla",
//     issuedOn:new Date(Date.now()-1000*60*60*24*30*3),
//     event:"Buildathon",
//     collegeName:"Bundelkhand Institute of Engineering and Technology",
//     collegeCity:"Jhansi",
//     validTill:new Date(Date.now()+1000*60*60*24*30*5)
// })
// certi1.save();
// certi2.save();
module.exports = Certificate;