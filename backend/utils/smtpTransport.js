const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GMAIL_USER_ID,
        pass: process.env.GMAIL_PASSWORD
    }
});

function sendMail(mailOptions){
    return new Promise((resolve,reject)=>{
        smtpTransport.sendMail(mailOptions, function(error,response){
            if(error){
                reject(error);
            }
            else{
                resolve(response);
            }
        })
    })
}
// function send(){
//     let mailOptions = {
//         to: "soorajshukla974@gmail.com",
//         subject: "Please confirm your Email account",
//         html:"Hello,<br> Please click on the link to verify your email.<br><a href='http://localhost:3000/verify?id=slfjslfjls'>Click here to verify</a>"
//     }
//     console.log(mailOptions);
//     sendMail(mailOptions).then(result => {
//         console.log('In then: result = ',result);
//     }).catch(err => {
//         console.log('error occured: err = ',err);
//     });
// }
// send();
module.exports = sendMail;