const Events = require("../../models/events");

const events = async (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10,
    startsGt: (req.query.gt && new Date(req.query.gt)) || new Date(2019), //startsOn in  database will always be greater than 2019 year
    startsLt:
      (req.query.lt && new Date(req.query.lt)) ||
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12 * 2), //there will be no event in our db which starts 2 years later from today
  };
  console.log(pageOptions);
  try {
    const noOfItems = await Events.countDocuments({});
    const evnts = await Events.find({
      startsOn: { $gt: pageOptions.startsGt, $lt: pageOptions.startsLt },
    })
      .sort({ startsOn: -1 })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);
    return res.send({ totalItems: noOfItems, events: evnts });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
module.exports = events;
