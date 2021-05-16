const CryptoJS = require('crypto-js');
const User = require("../../models/userModal");
const sendEmail = require('../../utils/smtpTransport');
const sendVerificationEmail = async (req,res) => {
    const id = req.session.userId;
    const user = await User.findById(decryptedID).exec();
    var encryptedID = CryptoJS.AES.encrypt(id,process.env.CRYPTOJS_SECRET).toString();
    const host = req.get('host');
    req.session.host = host;//to use while verifying through provided link
    const protocol = req.protocol;
    req.session.protocol = protocol;//to use while verifying email through provided link
    const link = `${protocol}://${host}/verifyEmail?id=${encryptedID}`;
    const mailOptions = {
        to:user.email,
        subject:"Please confirm your Email Address",
        html:`Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`
    }
    try{
        let response = await sendEmail(mailOptions);
        console.log(response.message);
        return res.status(200).send({msg:"An email has been sent to your email address. Click on the provided link to verify your email address"});
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}
module.exports = sendVerificationEmail;