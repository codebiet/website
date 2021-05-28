const User = require("../../models/userModal");
const jwt = require("jsonwebtoken");
const getResumeData = async (req, res) => {
  const token = req.cookies["token"];
  if (!token) return res.status(401).send({ errorMsg: "Unauthorized!" });
  let decoded, user;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return res.status(401).send({ errorMsg: "Unauthorized!" });
  }
  try {
    user = await User.findById(decoded.id).exec();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code:500, Internal Server Error!" });
  }
  let resumeData = { skills: {} };
  resumeData.name = user.name;
  const year = user.year;
  const translateYear = ["First", "Second", "Third", "Final"];
  resumeData.year = translateYear[year - 1];
  resumeData.degree = user.degree;
  resumeData.phoneNumber =
    user.callingPhoneNumber &&
    user.callingPhoneNumber.slice(user.callingPhoneNumber.length - 10);
  resumeData.email = user.email;
  resumeData.college = user.college;
  resumeData.city = user.collegeCity;
  resumeData.academics = user.academics;
  resumeData.objective = user.about;
  resumeData.projects = user.projects;
  resumeData.skills.programmingLanguages = user.programmingLanguages;
  resumeData.skills.technologies = [
    ...user.webTechnologies,
    ...user.webFrameworks,
    ...user.technologies,
  ];
  resumeData.skills.dbms = user.dbms;
  resumeData.skills.platforms = user.operatingSystem;
  resumeData.skills.other = [
    ...user.cloudHostingPlatforms,
    ...user.otherSkills,
  ];
  resumeData.img = user.profilePhoto;
  resumeData.achievements = user.achievements;
  console.log(resumeData);
  res.set("Cache-Control", "no-store");
  return res.status(200).send(resumeData);
};
module.exports = getResumeData;
