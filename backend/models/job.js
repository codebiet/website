const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    workType:{
        type:String,
        required:true
    },
    remote:{
        type:Boolean,
        default:false
    },
    duration:{
        type:String,
    },
    stipend:{
        type:Number,
    },
    applyBy:{
        type :Date,
        required:true
    },
    startedBy:{
        type:Date,
    },
    skills:{
        type:[String],
    },
    jobDescription:{
        type:String,
        required:true
    },
    totalOpening:{
        type:Number,
        required:true
    },
    applications:{
        type: [{
            userName:{type:String,required:true},
            email:{type:String,required:true},
            skills:{type:[String],required:true},
            contactNumber:{type:Number,required:true},
            resume:{type:String,required:true}
        }],
        select:false
    }
});

jobSchema.pre('save',function(next){
    // console.log('going to save',this)
    this.startedBy = new Date()
    next();
})

const Job = mongoose.model("Job",jobSchema)

module.exports = Job