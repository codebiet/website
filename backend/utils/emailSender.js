const sendEmail = require("./smtpTransport");
module.exports = (email,html,subject) => {
    //create the email
    const mailOptions = {
      to: email,
      subject: subject,
      html: html,
    };
    return new Promise(async (resolve, reject) => {
      try {
        let response = await sendEmail(mailOptions);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  };
  