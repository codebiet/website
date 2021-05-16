const User = require("../../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const uuid = require("uuid/v4");
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});
const parseJSON = (data) => {
  const interest = data.interest;
  data.interest = JSON.parse(interest);
  const programmingLanguages = data.programmingLanguages;
  const programmingLanguagesObj = [];
  for (var i = 0; i < programmingLanguages.length; i++) {
    programmingLanguagesObj.push(JSON.parse(programmingLanguages[i]));
  }
  data.programmingLanguages = programmingLanguagesObj;
  return data;
};
module.exports = async (req, res) => {
  let userData = req.body;
  //   console.log("data found : ", userData);
  userData = parseJSON(userData);
  //   console.log('data after parsing : ',userData);
  if (!userData.password)
    return res.status(400).send({ error: "Password Required" });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userData.password, salt, async (err, hash) => {
      if (err) res.status(500).send(err);
      userData.password = hash;
      if (req.files) {
        const resume = req.files.resume;
        const mimetype = resume.mimetype;
        console.log(mimetype);
        if (mimetype == "application/pdf") {
          const fileExt = resume.name.split(".").pop();
          const filename = uuid();
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${filename}.${fileExt}`,
            Body: resume.data,
          };

          s3.upload(params, async (err, data) => {
            if (err) {
              console.log("aws bucket name : ", process.env.AWS_BUCKET_NAME);
              console.log("error in saving: ", err);
              return res.status(500).send(err);
            } else {
              //resume uploaded to s3
              console.log("resume uploaded");
              console.log("going to add resume:", userData);
              userData.resume = `https://s3.ap-south-1.amazonaws.com/soorajarsn.warehouse/${filename}.${fileExt}`; //file url
              console.log("going to create user doc:", userData);
              try {
                const user = new User(userData);
                console.log("user doc created");
                const savedUser = await user.save(); //upload user to database
                console.log("saved User:", savedUser);
                //generating jwt_token
                jwt.sign(
                  { id: savedUser._id },
                  config.get("jwtSecret"),
                  { expiresIn: 60 * 60 },
                  (err, token) => {
                    if (err) return res.send(500).send(err);
                    res.cookie("token", token, {
                      maxAge: 60 * 60,
                      httpOnly: true,
                    });
                    req.session.userId = savedUser._id;//logged in
                    return res.redirect('/home')
                  }
                );
              } catch (err) {
                if (err.name == "ValidationError") {
                  var msgArray = [];
                  if (err.errors) {
                    // validation errors
                    for (field in err.errors) {
                      console.log(err.errors[field].message);
                    }
                  } else if (err.message) {
                    // should be execution error without err.errors
                    errLogr.log(err); // log execution errors
                    msgArray.push(err.message);
                  } else {
                    msgArray.push("Unknown error");
                  }
                  console.log(msgArray);
                  //   console.log(err.errors);
                  let msg = err
                    .toString()
                    .replace("ValidationError: ", "")
                    .split(",");
                  console.log(msg);
                }else console.log(err.message);
                return res.status(400).send({ error: "Invalid data" });
              }
            }
          });
        } else {
          return res.status(400).send({
            error: "Invalid resume type! Please upload your resume in pdf.",
          });
        }
      } else {
        //resume not uploaded
        const user = new User(userData);
        const savedUser = await user.save();
        console.log("saved User:", savedUser);
        jwt.sign(
          { id: savedUser._id },
          config.get("jwtSecret"),
          { expiresIn: 60 * 60 },
          (err, token) => {
            if (err) return res.send(500).send(err);
            res.cookie("token", token, {
              maxAge: 60 * 60,
              httpOnly: true,
            });
            req.session.userId = savedUser._id;
            return res.redirect('/home')
          }
        );
      }
    });
  });
};
