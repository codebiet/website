const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport('SMTP',{
    service: 'Gmail',
    auth:{
        user: process.env.GMAIL_USER_ID,
        password: process.env.GMAIL_PASSWORD
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