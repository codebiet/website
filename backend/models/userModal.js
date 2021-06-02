const mongoose = require("./connection");

const emailValidator = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const emailValidatorWithMsg = [
  emailValidator,
  "Invalid {PATH}! Please check your email.",
];

const phoneNumberValidator = (phoneNumber) => {
  return phoneNumber.length == 12 || phoneNumber.length == 0;
};
const phoneNumberValidatorWithMsg = [
  phoneNumberValidator,
  "Invalid `{PATH}`! Please check your phone Number.",
];

const githubUserNameValidator = (username) => {
  if (!username) return true;
  const re = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return re.test(username);
};
const githubUserNameValidatorWithMsg = [
  githubUserNameValidator,
  "Invalid `{PATH}`! Please check your username",
];

const passwordValidator = (password) => {
  return password.length >= 8;
};
const passwordValidatorWithMsg = [
  passwordValidator,
  "Error! Password length should be >=8!",
];
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidatorWithMsg,
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidatorWithMsg,
  },
  degree: String,
  college: String,
  collegeCity: String,
  academics: [
    {
      year: String,
      degree: String,
      college: String,
      result: {
        gpa: String,
        percentage: String,
      },
    },
  ],
  achievements: [String],
  about: String,
  callingPhoneNumber: { type: String, validate: phoneNumberValidatorWithMsg },
  whatsAppPhoneNumber: { type: String, validate: phoneNumberValidatorWithMsg },
  year: { type: Number },
  branch: { type: String },
  rollNum: { type: String },
  githubUserName: { type: String, validate: githubUserNameValidatorWithMsg },
  programmingLanguages: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Expert"],
      },
    },
  ],
  webTechnologies: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Expert"],
      },
    },
  ],
  webFrameworks: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Expert"],
      },
    },
  ],
  dbms: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Expert"],
      },
    },
  ],
  operatingSystem: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Expert"],
      },
    },
  ],
  technologies: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Expert"],
      },
    },
  ],
  cloudHostingPlatforms: [String],
  otherSkills: [String],
  interest: {
    preference1: {
      type: String,
      enum: [
        "",
        "Artificial Intelligence",
        "Robotics",
        "Web Development",
        "Mobile Application Development",
        "Cloud Computing",
        "Cyber Security and Ethical Hacking",
        "Data Science and Data Analysis",
        "Computer Software",
        "Game development",
      ],
    },
    preference2: {
      type: String,
      enum: [
        "",
        "Artificial Intelligence",
        "Robotics",
        "Web Development",
        "Mobile Application Development",
        "Cloud Computing",
        "Cyber Security and Ethical Hacking",
        "Data Science and Data Analysis",
        "Computer Software",
        "Game development",
      ],
    },
    preference3: {
      type: String,
      enum: [
        "",
        "Artificial Intelligence",
        "Robotics",
        "Web Development",
        "Mobile Application Development",
        "Cloud Computing",
        "Cyber Security and Ethical Hacking",
        "Data Science and Data Analysis",
        "Computer Software",
        "Game development",
      ],
    },
  },
  internships: [
    {
      title: { type: String, required: true },
      type: { type: String, required: true },
      technologies: { type: String, required: true },
      credentials: { type: String, required: true },
    },
  ],
  projects: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      technologies: { type: String, required: true },
      credentials: { type: String, required: true },
    },
  ],
  trainings: [
    {
      name: { type: String, required: true },
      credentials: { type: String, required: true },
    },
  ],
  resume: { type: String },
  profilePhoto: { type: String },
  emailVerified: { type: Boolean, default: false },
  callingVerified: { type: Boolean, default: false },
  whatsAppVerified: { type: Boolean, default: false },
  role: { type: String, enum: ["Student", "Professional"], default: "Student" },
});

userSchema.query.findByEmail = function (email) {
  return this.findOne({ email: email });
};
userSchema.query.findByPhoneNumber = function (number) {
  return this.findOne({ whatsAppPhoneNumber: new RegExp(number, "i") });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
