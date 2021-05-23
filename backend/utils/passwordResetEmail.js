const sendEmail = require("./smtpTransport");
const encrypt = require('./encrypt');
const getHTML = (link) => {
  return `
    <div style="margin:0;padding:2rem 0;min-width:100%;background-color:#0f2b3c">
    <center style="width:100%;table-layout:fixed">
      <div style="max-width:500px">
        <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;width:100%" role="presentation">
          <tr>
            <td style="text-align:center">
              <img src="https://s3.ap-south-1.amazonaws.com/soorajarsn.warehouse/codeLogo.png" style="width:50%" class="CToWUd"/>
            </td>
          </tr>
          <tr>
            <td style="padding:15px 20px 21px;color:#232f3e;font-family:Arial,sans-serif;font-size:12px;line-height:22px;text-align:left;color:white;"> 
              <h1 style="margin:30px 0;font-weight:bold;font-size:18px;line-height:24px;text-align:center">Verification Link to Join Code</h1>
              <p style="font-size:1rem;margin:1rem 0;">Please click on the link given below to reset your password:</p>
              <div aria-label="verification-link">
                <a style="font-size:1.1rem;text-decoration:none;color:#1f3c88;margin:2rem 0;color:orange;" href=${link}>Click here to reset your Password!</a>
              </div>
            </td>
          </tr>
        <tr>
          <td bgcolor="#0f2b3c" style="padding:18px 20px 17px;font-size:0">
              <table border="0" cellpadding="0" cellspacing="0" style="width:100%">
                  <tbody>
                    <tr>
                      <td style="font-size:0;text-align:left">
                        <table border="0" cellspacing="0" cellpadding="0" style="display:inline-table">
                          <tbody> 
                            <tr> 
                              <td style="padding:0 10px 0 0;font-size:0">
                                <a href="https://www.facebook.com/groups/codebiet/" target="_blank">
                                  <img src="https://s3-us-west-2.amazonaws.com/notification-images-store/facebook.png" alt="Facebook" width="26" height="26" border="0" class="CToWUd">
                                </a>
                              </td>
                              <td style="padding:0 10px 0 0;font-size:0">
                                <a href="https://www.linkedin.com/company/codebietjhs/" target="_blank">
                                  <img src="https://s3-us-west-2.amazonaws.com/notification-images-store/linkedin.png" alt="LinkedIn" width="26" height="26" border="0" class="CToWUd">
                                </a>
                              </td> 
                            </tr> 
                          </tbody> 
                        </table>
                      </td>  
                      <td style="font-size:0;text-align:right">
                        <p style="margin:1px 0 0 20px">
                        </p>
                      </td>
                    </tr>
                  </tbody>
              </table>
          </td>
        </tr>
        </table>
      </div>
      </center>
    </div>
  `;
};
module.exports = (id,email) => {
  //encrypt the id and current time
  console.log('id ',id);
  var encryptedID = encrypt(id.toString());
  var encryptedTime = encrypt(Date.now().toString());
  //construct link with the encrypted ID and current time
  //a = id && b = time, used bad naming so that verification link do not get very obivious to user or third party
  const link = `${process.env.PROTOCOL}://${process.env.HOST}/forgotPassword?a=${encryptedID}&b=${encryptedTime}`;
  //create the email
  const mailOptions = {
    to: email,
    subject: "Reset your Password",
    html: getHTML(link),
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
