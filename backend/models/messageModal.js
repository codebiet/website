const mongoose = require('./connection');
const certificateSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    msg:{type:String,required:true},
    receivedOn:{type:Date,default:Date.now()},
    replied:{type:Boolean,default:false}
});
const Message = mongoose.model("Messages",certificateSchema);
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
module.exports = Message;