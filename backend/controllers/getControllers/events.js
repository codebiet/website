const Events = require("../../models/events");

const getUTCDate = (ISTDateString) => {
  return new Date(new Date(ISTDateString) - 1000 * 60 * (60 * 5 + 30));
};
const events = async (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 10,
    startsGt: (req.query.gt && getUTCDate(req.query.gt)) || new Date(2019), //startsOn in  database will always be greater than 2019 year
    startsLt:
      (req.query.lt && getUTCDate(req.query.lt)) ||
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12), //there will be no event in our db which starts a year later from today
    type: (req.query.type && [req.query.type]) || ["Coding", "Webinar"], //if type not specified, return all
  };
  //since our time zone is GMT+05:30 and mongodb stores date in UTC format, that's why subtracted - 05:30hours in date to get correct match for gt and lt;
  try {
    const noOfItems = await Events.countDocuments({
      startsOn: { $gt: pageOptions.startsGt, $lt: pageOptions.startsLt },
      type: { $in: pageOptions.type },
    });
    const evnts = await Events.find({
      startsOn: { $gt: pageOptions.startsGt, $lt: pageOptions.startsLt },
      type: { $in: pageOptions.type },
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
