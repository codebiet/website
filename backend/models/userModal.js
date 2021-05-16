const mongoose = require('./connection');

const emailValidator = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email); 
}
const emailValidatorWithMsg = [emailValidator,"Invalid `{PATH}`! Got `{VALUE}`"];


const phoneNumberValidator = (phoneNumber) => {
    return phoneNumber.length == 12;
}
const phoneNumberValidatorWithMsg = [phoneNumberValidator,'Invalid `{PATH}`! Got `{VALUE}`'];

const githubUserNameValidator = (username) => {
    const re = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    return re.test(username);
}
const githubUserNameValidatorWithMsg = [githubUserNameValidator,'Invalid `{PATH}! Got `{VALUE}``']
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,validate:emailValidatorWithMsg},
    callingPhoneNumber: {type:String,unique:true,validate:phoneNumberValidatorWithMsg},
    whatsAppPhoneNumber:{type:String, unique:true, validate: phoneNumberValidatorWithMsg},
    year:{type:Number,required:true},
    branch:{type:String,required:true},
    githubUserName:{type:String,required:true,validate:githubUserNameValidatorWithMsg},
    programmingLanguages:[
        {
            name:{type:String,required:true},
            level:{
                type:String,
                required:true,
                enum:['Beginner','Intermediate','Expert']
            }
        }
    ],
    webTechnologies:[
        {
            name:{type:String,required:true},
            level:{
                type:String,
                required:true,
                enum:['Beginner','Intermediate','Expert']
            }
        }
    ],
    webFrameworks:[
        {
            name:{type:String,required:true},
            level:{
                type:String,
                required:true,
                enum:['Beginner','Intermediate','Expert']
            }
        }
    ],
    dbms:[
        {
            name:{type:String,required:true},
            level:{
                type:String,
                required:true,
                enum:['Beginner','Intermediate','Expert']
            }
        }
    ],
    operatingSystem:[
        {
            name:{type:String,required:true},
            level:{
                type:String,
                required:true,
                enum:['Beginner','Intermediate','Expert']
            }
        }
    ],
    technologies:[
        {
            name:{type:String,required:true},
            level:{
                type:String,
                required:true,
                enum:['Beginner','Intermediate','Expert']
            }
        }
    ],
    cloudHostingPlatforms:[String],
    otherSkills:String,
    interest:{
        preference1:{type:String,required:true},
        preference2:{type:String,required:true},
        preference3:{type:String,required:true}
    },
    internshipsOrProjects:String,
    trainings:String,
    resume:{type:String,required:true}
});

userSchema.query.findByEmail = function(email){
    return this.find({email: new RegExp(email,'i')});
}
userSchema.query.findByPhoneNumber = function(number){
    return this.find({whatsAppPhoneNumber:new RegExp(number,'i')});
}

const User = mongoose.model("User",userSchema);

module.exports = User;