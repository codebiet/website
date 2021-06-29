const mongoose = require("./connection");

const doubtSchema = mongoose.Schema({
  queryTitle: { type: String, required: true },
  queryDescription: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  replies: [
    {
      replyTitle: { type: String, required: true },
      replyDescription: { type: String, required: true },
      tags: { type: [String], required: true },
      repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
      repliedAt: { type: Date, default: Date.now() },
    },
  ],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  postedAt: { type: Date, default: Date.now() },
});

const doubt = mongoose.model("doubt", doubtSchema);

module.exports = doubt;
