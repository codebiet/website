const sendEmail = require("./smtpTransport");
const getHTML = (linkToBlog) => {
  return `
        <p style="color:black;font-size:16px;">Someone replied on your comment</p>
        <a href=${linkToBlog} style="color:#ff9b21;font-size:14px;text-decoration:none;">Go to the Blog</a>
  `;
};
module.exports =  (email, linkToBlog) => {
  //create the email
  const mailOptions = {
    to: email,
    subject: "People are reacting on your comment",
    html: getHTML(linkToBlog),
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
