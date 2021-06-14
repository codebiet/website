const mongoose = require("./connection");
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Webinar", "Coding"], required: true },
  entryFee: { type: String, required: true },
  startsOn: { type: Date, required: true },
  endsOn: { type: Date, required: true },
  duration: { type: String, required: true },
  venue: { type: String, required: true },
  shortDescription: { type: String, required: true },
  tags: [String],
  details: String,
  banner: { type: String, required: true },
  cardImg: { type: String, required: true },
  registered: {type:[mongoose.Schema.Types.ObjectId],select:false},
});
const Events = mongoose.model("Events", eventSchema);
module.exports = Events;
