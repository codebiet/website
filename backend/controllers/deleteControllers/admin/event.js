const Events = require("../../../models/events");
const events = async (req, res) => {
  const id = req.params.id;
  try {
    await Events.findByIdAndDelete(id).exec();
    const evnts = await Events.find({});
    // console.log(evnts);
    return res.send({ events: evnts });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
module.exports = events;
