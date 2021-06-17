const mongoose = require("./connection");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleLower: {
    type: String,
    default: function () {
      return this.title.toLowerCase();
    },
  },
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
  suggestedBy: { type: String, default: "ADMIN", enum: ["ADMIN", "USER"] },
  suggestedById: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, //this will be used to get the user who suggested, if this suggestion was by a user;
  approvedSuggestion: { type: Boolean, default: false },
  disapprovedSuggestion: { type: Boolean, default: false },
  cardImg: String,
});
const Blogs = mongoose.model("Blogs", blogSchema);
module.exports = Blogs;
