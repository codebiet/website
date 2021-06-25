const mongoose = require("./connection");
const emailValidator = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const emailValidatorWithMsg = [
  emailValidator,
  "Invalid {PATH}! Please check your email.",
];

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: emailValidatorWithMsg,
  },
  subscribed: {
    type: Boolean,
    default: true,
  },
  subscribedAt: { type: Date, default: Date.now() },
});

const newsLetter = mongoose.model("newsletter", newsletterSchema);

module.exports = newsLetter;
