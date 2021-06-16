const Events = require("../../../models/events");
const events = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const id = req.params.id;
  try {
    const evnts = await Events.findById(id).select("+registered");
    if (!evnts) return res.status(404).send({ errorMsg: "Event Not Found" });
    const registrations = evnts.registered;
    return res.send({
      totalItems: registrations.length,
      registered: registrations.slice(page * limit, (page + 1) * limit),
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
module.exports = events;

// Model.aggregate([
//     { "$unwind": "$books" },
//     { "$replaceRoot": { "newRoot": "$books" } }
//   ],function(err,results) {

//   })