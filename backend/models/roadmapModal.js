const mongoose = require("./connection");
const roadmapSchema = new mongoose.Schema({
  roadmapTitle: { type: String, required: true },
  type: { type: String, required: true },
  roadmapDescription: { type: String, required: true },
  roadmapImg: {type: String, required: true}
});
const roadmaps = mongoose.model("roadmaps", roadmapSchema);
module.exports = roadmaps;
