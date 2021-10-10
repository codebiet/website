const User = require("../../models/userModal");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const uploadS3 = require("../../utils/uploadS3");
const updateProfile = async (req, res) => {
  const token = req.cookies["token"];
  if (!token) return res.status(401).send({ errorMsg: "Unauthorized!" });
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ errorMsg: "Invalid Token!" });
  }
  let user;
  try {
    user = await User.findById(decoded.id).exec();
    if (!user) return res.status(400).send({ errorMsg: "Invalid request!" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ errorMsg: "Internal Server Error!" });
  }
  if (req.body.updatingFor == "RESUME" || true) {
    let {
      degree,
      college,
      city,
      higherStudy,
      academics,
      achievements,
      objective,
    } = req.body;
    let saved_user, user_data, error;
    //higherStudy is sent in request payload only if it has valid value
    if (higherStudy) {
      higherStudy = JSON.parse(higherStudy);
      higherStudy.resultType = higherStudy.type; //since type can't be used as field in mongoose
      delete higherStudy.type;
    }
    //if higher study included in payload, means contains a valid value
    else
      higherStudy = {
        //if not included in request payload then it means either it is reset or isn't updated yet.
        year: "",
        degree: "",
        college: "",
        result: "",
        resultType: "",
      };
    academics = JSON.parse(academics);
    achievements = JSON.parse(achievements);
    // console.log(higherStudy);
    if (!degree || !college || !city || academics.length < 3 || !objective)
      return res.status(400).send({
        errorMsg:
          "All the fields are required under Basic Information and Academics Section",
        userData: { ...user._doc },
      });
    user.degree = degree;
    user.college = college;
    user.collegeCity = city;
    user.about = objective;
    user.academics = academics;
    user.higherStudy = higherStudy;
    user.achievements = achievements;
    // try{
    //   saved_user = await user.save();
    // user_data = {
    //   profilePhoto:saved_user.profilePhoto,
    //   degree:saved_user.degree,
    //   college:saved_user.college,
    //   collegeCity:saved_user.collegeCity,
    //   about:saved_user.about,
    //   academics:saved_user.academics,
    //   achievements:saved_user.achievements
    // }
    // }catch(err){
    //   error = "Status-Code: 500, Internal Server Error";
    //   user_data = {
    //     profilePhoto:user.profilePhoto,
    //     degree:user.degree,
    //     collegeCity:user.college,
    //     city:user.collegeCity,
    //     about:user.about,
    //     academics:user.academics,
    //     achievements:user.achievements
    //   }
    // }
    // if (error) return res.status(400).send({ error, userData: user_data });
    // else return res.status(200).send({ ...user_data });
  }
  if (req.body.updatingFor != "RESUME" || true) {
    //both blocks(above and this) need to run, since now all the data is comming from profile update;
    let {
      role,
      companiesWorked,
      callingPhoneNumber,
      whatsAppPhoneNumber,
      year,
      branch,
      rollNum,
      githubUserName,
      programmingLanguages,
      webTechnologies,
      webFrameworks,
      dbms,
      operatingSystem,
      technologies,
      cloudHostingPlatforms,
      otherSkills,
      interest,
      internships,
      projects,
      trainings,
    } = req.body;
    // console.log("role is ", role);
    if (role == "Professional") companiesWorked = JSON.parse(companiesWorked);
    else companiesWorked = [];
    // console.log(companiesWorked);
    programmingLanguages = JSON.parse(programmingLanguages);
    // console.log(webTechnologies);
    webTechnologies = JSON.parse(webTechnologies);
    webFrameworks = JSON.parse(webFrameworks);
    dbms = JSON.parse(dbms);
    operatingSystem = JSON.parse(operatingSystem);
    technologies = JSON.parse(technologies);
    cloudHostingPlatforms = JSON.parse(cloudHostingPlatforms);
    otherSkills = JSON.parse(otherSkills);
    interest = JSON.parse(interest);
    internships = JSON.parse(internships);
    projects = JSON.parse(projects);
    trainings = JSON.parse(trainings);
    let resumeUrl = "";
    let profileUrl = "";
    let errorMsg = "";
    if (callingPhoneNumber.length >= 10) {
      user.callingPhoneNumber =
        "91" + callingPhoneNumber.slice(callingPhoneNumber.length - 10);
      user.callingVerified = true; //to be removed for otp verification
    } else {
      errorMsg = "Invalid Calling Phone Number";
    }
    if (whatsAppPhoneNumber.length >= 10) {
      user.whatsAppPhoneNumber =
        "91" + whatsAppPhoneNumber.slice(whatsAppPhoneNumber.length - 10);
      user.whatsAppVerified = true; //to be removed for otp verification;
    } else {
      errorMsg = "Invalid Whatsapp Number";
    }
    if (year) user.year = year;
    if (branch) user.branch = branch;
    if (rollNum) user.rollNum = rollNum;
    user.role = role;
    user.companiesWorked = companiesWorked;
    user.githubUserName = githubUserName;
    user.programmingLanguages = programmingLanguages;
    user.webTechnologies = webTechnologies;
    user.webFrameworks = webFrameworks;
    user.dbms = dbms;
    user.operatingSystem = operatingSystem;
    user.technologies = technologies;
    user.cloudHostingPlatforms = cloudHostingPlatforms;
    user.otherSkills = otherSkills;
    user.interest = interest;
    user.internships = internships;
    user.projects = projects;
    user.trainings = trainings;
    if (req.files) {
      const resume = req.files.resume;
      const profile = req.files.profilePhoto;
      if (resume && resume.mimetype == "application/pdf") {
        const fileExt = resume.name.split(".").pop();
        const filename = uuid();
        const resumeParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${filename}.${fileExt}`,
          Body: resume.data,
          ContentType: resume.mimetype,
        };
        try {
          resumeUrl = await uploadS3(resumeParams);
        } catch (err) {
          errorMsg = "Error while uploading Resume";
        }
      }
      if (
        profile &&
        (profile.mimetype == "image/jpeg" || profile.mimetype == "image/png")
      ) {
        const ext = profile.name.split(".").pop();
        const fileName = uuid();
        const profileParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${fileName}.${ext}`,
          ContentType: profile.mimetype,
          Body: profile.data,
        };
        try {
          profileUrl = await uploadS3(profileParams);
          // console.log(profileUrl);
        } catch (err) {
          if (!errorMsg) errorMsg = "Error while uploading Profile Photo";
          else errorMsg = "Error while uploading Resume and Profile Photo";
        }
      }
      if (
        profile &&
        !(profile.mimetype == "image/jpeg" || profile.mimetype == "image/png")
      ) {
        errorMsg =
          "Invalid profile Image! Expected: image/jpeg, image/png; Got: " +
          profile.mimetype;
      }
      if (resume && resume.mimetype != "application/pdf") {
        errorMsg =
          "Invalid resume file type! Expected: application/pdf; Got: " +
          resume.mimetype;
      }
    }
    if (resumeUrl) user.resume = resumeUrl;
    if (profileUrl) user.profilePhoto = profileUrl;
    let savedUser, userData;
    if (!errorMsg) {
      try {
        savedUser = await user.save();
        userData = { ...savedUser._doc };
      } catch (err) {
        console.log(err);
        errorMsg = "Status-Code: 500, Internal Server Error";
        userData = { ...user._doc };
      }
    }
    delete userData.password;
    delete userData._id;
    delete userData.emailVerified;
    if (errorMsg) return res.status(400).send({ errorMsg, userData: userData });
    else return res.status(200).send({ ...userData });
  }
};

module.exports = updateProfile;
