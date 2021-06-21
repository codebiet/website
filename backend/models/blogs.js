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
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  pickedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  pickedAt: Date,
  state: {
    type: String,
    enum: ["AVAILABLE", "PICKED", "DRAFT", "PENDING", "APPROVED", "DISCARDED"],
    default: "AVAILABLE",
  },
  tags: [String],
  category: { type: String, required: true },
  suggestedBy: { type: String, default: "ADMIN", enum: ["ADMIN", "USER"] },
  suggestedById: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, //this will be used to get the user who suggested, if this suggestion was by a user;
  approvedSuggestion: { type: Boolean, default: false },
  disapprovedSuggestion: { type: Boolean, default: false },
  cardImg: String,
  likes: { type: Number, default: 0, select: false },
  comments: {
    type: [
      {
        body: { type: String, required: true },
        commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        replies: [
          {
            body: { type: String, required: true },
            repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
            repliedAt: { type: Date, default: Date.now() },
          },
        ],
        commentedAt: { type: Date, default: Date.now() },
      },
    ],
    select: false,
  },
});
const Blogs = mongoose.model("Blogs", blogSchema);
module.exports = Blogs;
