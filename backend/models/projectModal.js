const mongoose = require("./connection");

const projSchema = new mongoose.Schema({
  developerName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  mainStack: {
    type: String,
    // required:true
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
    // required:true
  },
  imgUrls: {
    type: [String],
    // required:true
  },
  demoUrl: {
    type: String,
    // required:true
  },
  repoUrl: {
    type: String,
    // required:true
  },
  documentationUrl: {
    type: String,
    // required:true
  },
});
module.exports = mongoose.model("Project", projSchema);
