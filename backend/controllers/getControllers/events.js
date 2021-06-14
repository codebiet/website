const Events = require("../../models/events");

const events = async (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit:parseInt(req.query.limit) || 10
  }
  try {
    const noOfItems = (await Events.count({}));
    const evnts = await Events.find({}).skip(pageOptions.page*pageOptions.limit).limit(pageOptions.limit);
    return res.send({totalItems:noOfItems, events: evnts });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
module.exports = events;
