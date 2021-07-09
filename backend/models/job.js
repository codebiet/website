const mongoose = require("./connection");

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  workType: {
    type: String,
    required: true,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: String,
  },
  stipend: {
    type: Number,
  },
  applyBy: {
    type: Date,
    required: true,
  },
  startedBy: {
    type: Date,
  },
  skills: {
    type: [String],
  },
  jobDescription: {
    type: String,
    required: true,
  },
  totalOpening: {
    type: Number,
    required: true,
  },
  applications: {
    type: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        _id: false,
      },
    ],
    select: false,
  },
});

jobSchema.pre("save", function (next) {
  this.startedBy = new Date();
  next();
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
