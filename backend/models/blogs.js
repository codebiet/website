const mongoose = require("./connection");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: {
    type: String,
    default: function () {
      return this.title.split(" ").join("-");
    },
  },
  content: String,
  discardReason: String,
  suggestedAt: { type: Date, default: Date.now() },
  postedAt: { type: Date },
  pickedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  state: {
    type: String,
    enum: ["AVAILABLE", "PICKED", "DRAFT", "PENDING", "APPROVED", "DISCARDED"],
    default: "AVAILABLE",
  },
  tags: [String],
  suggestedBy: { type: String, default: "ADMIN" },
  approvedSuggestion: { type: Boolean, default: false },
  cardImg:String
});
const Blogs = mongoose.model("Blogs", blogSchema);
module.exports = Blogs;
