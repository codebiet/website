const mongoose = require("./connection");
const roadmapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  shortDescription: { type: String, required: true },
});
const roadmaps = mongoose.model("roadmaps", roadmapSchema);
module.exports = roadmaps;
