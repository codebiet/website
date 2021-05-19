const sendEmail = require("./smtpTransport");
const crypto = require("crypto");
const encrypt = (text) => {
  var cipher = crypto.createCipher(
    process.env.ENCRYPTION_ALGO,
    process.env.CRYPTOJS_SECRET
  );
  var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};
const getHTML = (link) => {
  return `
    <div style="margin:0;padding:0;min-width:100%;background-color:#ffffff">
    <center style="width:100%;table-layout:fixed">
      <div style="max-width:500px">
        <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;width:100%" role="presentation">
          <tr>
            <td>
              <img src="https://s3.ap-south-1.amazonaws.com/soorajarsn.warehouse/codeLogo.png" style="width:100%" />
            </td>
          </tr>
          <tr>
            <td style="padding:15px 59px 21px;color:#232f3e;font-family:Arial,sans-serif;font-size:12px;line-height:22px;text-align:left"> 
              <h1 style="margin:30px 0;font-weight:bold;font-size:18px;line-height:24px;text-align:center">Verification Link to Join Code</h1>
              <p style="font-size:1rem;margin:1rem 0;">Please click on the link given below to verify your Email:</p>
              <div aria-label="verification-link">
                <a style="font-size:1.1rem;text-decoration:none;color:#1f3c88;margin:2rem 0;" href=${link}>Click here to verify your Email!</a>
              </div>
              <p style="font-size:1rem;margin:1rem 0;">This link will be active for ${process.env.EMAIL_LINK_VALIDITY} minutes. If it has expired you can request a new link from the verification page.</p>
            </td>
          </tr>
        <tr>
          <td bgcolor="#0f2b3c" style="padding:18px 59px 17px;font-size:0">
              <table border="0" cellpadding="0" cellspacing="0" style="width:100%">
                  <tbody>
                    <tr>
                      <td style="font-size:0;text-align:left">
                        <table border="0" cellspacing="0" cellpadding="0" style="display:inline-table">
                          <tbody> 
                            <tr> 
                              <td style="padding:0 10px 0 0;font-size:0">
                                <a href="" target="_blank">
                                  <img src="https://s3-us-west-2.amazonaws.com/notification-images-store/linkedin.png" alt="Facebook" width="26" height="26" border="0" class="CToWUd">
                                </a>
                              </td>
                              <td style="padding:0 10px 0 0;font-size:0">
                                <a href="" target="_blank">
                                  <img src="https://s3-us-west-2.amazonaws.com/notification-images-store/linkedin.png" alt="LinkedIn" width="26" height="26" border="0" class="CToWUd">
                                </a>
                              </td> 
                            </tr> 
                          </tbody> 
                        </table>
                      </td>  
                      <td style="font-size:0;text-align:right">
                        <p style="margin:1px 0 0 20px">
                          <a href="http://localhost:3000" target="_blank">
                            <img src="https://s3.ap-south-1.amazonaws.com/soorajarsn.warehouse/codeLogo.png" alt="Code" width="80" height="19" border="0" class="CToWUd">
                          </a>
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
// `<br><br>Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a><br>The above link is valid for ${process.env.EMAIL_LINK_VALIDITY} minutes only`,
module.exports = (id, email) => {
  //encrypt the id and current time
  var encryptedID = encrypt(id);
  var encryptedTime = encrypt(Date.now().toString());
  //construct link with the encrypted ID and current time
  //a = id && b = time, used bad naming so that verification link do not get very obivious to user or third party
  const link = `${process.env.PROTOCOL}://${process.env.HOST}/api/verifyEmail?a=${encryptedID}&b=${encryptedTime}`;
  //create the email
  const mailOptions = {
    to: email,
    subject: "Please confirm your Email Address",
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
