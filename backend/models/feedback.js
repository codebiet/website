const mongoose = require("./connection");
const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  seen: { type: Boolean, default: false }, //this attribute can be used if we want to make admin panel for viewing user feedbacks and manage if a feedback is viewed by an admin
});

const feedback = mongoose.model("feedback", feedbackSchema);

module.exports = feedback;
