const User = require("../../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const parseJSON = (data) => {
  const programmingLanguages = data.programmingLanguages;
  const webTechnologies = data.webTechnologies;
  const webFrameworks = data.webFrameworks;
  const dbms = data.dbms;
  const operatingSystem = data.operatingSystem;
  const technologies = data.technologies;
  const cloudHostingPlatforms = data.cloudHostingPlatforms;
  const interest = data.interest;
  data.programmingLanguages = JSON.parse(programmingLanguages);
  data.webTechnologies = JSON.parse(webTechnologies);
  data.webFrameworks = JSON.parse(webFrameworks);
  data.dbms = JSON.parse(dbms);
  data.operatingSystem = JSON.parse(operatingSystem);
  data.technologies = JSON.parse(technologies);
  data.cloudHostingPlatforms = JSON.parse(cloudHostingPlatforms);
  data.interest = JSON.parse(interest);
  return data;
};
module.exports = async (req, res) => {
  let userData = req.body;
  //   console.log("data found : ", userData);
  console.log(userData);
  // userData = parseJSON(userData);
  // console.log(userData);
  //   console.log('data after parsing : ',userData);
  if (!userData.email)
    return res.status(400).send({ errorMsg: "Email is required!" });
  let existingUser;
  try{
    existingUser = await User.findOne().findByEmail(userData.email).exec();
  }catch(err){
    console.log(err);
    return res.status(500).send("Status-Code: 500, Internal Server Error")
  }
  if (existingUser)
    return res
      .status(400)
      .send({ errorMsg: "This email is already registered!" });
  //commented the following lines, since password will be set after the email is verified!
  // if (!userData.password)
  //   return res.status(400).send({ errorMsg: "Password Required!" });
  // if (userData.password != userData.confirmPassword)
  //   return res.status(400).send({ errorMsg: "Passwords don't matched!" });
  //here we'll set random password for the user
  userData = {
    name: userData.name,
    email: userData.email,
    password: "kslfklk123o2#$lkwr1231",
    role: userData.role,
  };
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userData.password, salt, async (err, hash) => {
      if (err) res.status(500).send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
      userData.password = hash;
      // if (req.files) {
      //   const resume = req.files.resume;
      //   const mimetype = resume.mimetype;
      //   console.log(mimetype);
      //   if (mimetype == "application/pdf") {
      //     const fileExt = resume.name.split(".").pop();
      //     const filename = uuid();
      //     const params = {
      //       Bucket: process.env.AWS_BUCKET_NAME,
      //       Key: `${filename}.${fileExt}`,
      //       Body: resume.data,
      //     };

      //     s3.upload(params, async (err, data) => {
      //       if (err) {
      //         console.log("aws bucket name : ", process.env.AWS_BUCKET_NAME);
      //         console.log("error in saving: ", err);
      //         return res.status(500).send(err);
      //       } else {
      //         //resume uploaded to s3
      //         console.log("resume uploaded");
      //         console.log("going to add resume:", userData);
      //         userData.resume = `https://s3.ap-south-1.amazonaws.com/soorajarsn.warehouse/${filename}.${fileExt}`; //file url
      //         console.log("going to create user doc:", userData);
      //         try {
      //           const user = new User(userData);
      //           console.log("user doc created");
      //           const savedUser = await user.save(); //upload user to database
      //           console.log("saved User:", savedUser);
      //           //generating jwt_token
      //           jwt.sign(
      //             { id: savedUser._id },
      //             process.env.JWT_SECRET,
      //             { expiresIn: 60 * 60 },
      //             (err, token) => {
      //               if (err) return res.send(500).send(err);
      //               res.cookie("token", token, {
      //                 maxAge: 60 * 60,
      //                 httpOnly: true,
      //               });
      //               req.session.userId = savedUser._id;//logged in
      //               req.session.mobileNumber = savedUser.callingPhoneNumber;
      //               return res.redirect('/home')
      //             }
      //           );
      //         } catch (err) {
      //           if (err.name == "ValidationError") {
      //             var msgArray = [];
      //             if (err.errors) {
      //               // validation errors
      //               for (field in err.errors) {
      //                 console.log(err.errors[field].message);
      //               }
      //             } else if (err.message) {
      //               // should be execution error without err.errors
      //               errLogr.log(err); // log execution errors
      //               msgArray.push(err.message);
      //             } else {
      //               msgArray.push("Unknown error");
      //             }
      //             console.log(msgArray);
      //             //   console.log(err.errors);
      //             let msg = err
      //               .toString()
      //               .replace("ValidationError: ", "")
      //               .split(",");
      //             console.log(msg);
      //           }else console.log(err.message);
      //           return res.status(400).send({ error: "Invalid data" });
      //         }
      //       }
      //     });
      //   } else {
      //     return res.status(400).send({
      //       error: "Invalid resume type! Please upload your resume in pdf.",
      //     });
      //   }
      // } else {
      //resume not uploaded
      const user = new User(userData);
      let savedUser;
      try{
        savedUser = await user.save();
      }catch(err){
        console.log(err);
        return res.status(500).send({errorMsg:"Status-Code: 500, Internal Server Error!"})
      }
      jwt.sign(
        { id: savedUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "6h" },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
          }
          res.cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
            httpOnly: false,
          });
          res.cookie("userName", user.name, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
            httpOnly: false,
          });
          res.cookie("userId", user._id, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
            httpOnly: false,
          });
          res.cookie("emailVerified", user.emailVerified, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
            httpOnly: false,
          });
          res.cookie("phoneNumberVerified", user.phoneNumberVeried, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
            httpOnly: false,
          });
          res.cookie("userLoggedIn", false, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
            httpOnly: false,
          });
          // req.session.mobileNumber = savedUser.callingPhoneNumber;
          return res
            .status(200)
            .send({
              token,
              userName: savedUser.name,
              userId: savedUser._id,
            });
        }
      );
      // }
    });
  });
};
