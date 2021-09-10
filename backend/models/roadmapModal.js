const mongoose = require("./connection");
const slugify = require("slugify");
const roadmapSchema = new mongoose.Schema({
  roadmapTitle: { type: String, required: true },
  type: { type: String, required: true },
  url: {
    type: String,
    default: function () {
      return slugify(this.roadmapTitle.toLowerCase(), {
        remove: /[*+~.()'"!:@//\\?]/g,
      }); //to make url from the blog title
    },
  },
  roadmapDescription: { type: String, required: true },
  roadmapImg: {type: String, required: true}
});
const roadmaps = mongoose.model("roadmaps", roadmapSchema);
module.exports = roadmaps;
