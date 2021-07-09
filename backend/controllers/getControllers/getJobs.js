const Job = require("../../models/job");

module.exports = async (req, res) => {
  const filter = req.query.filter ? req.query.filter : "All";

  const queryObj = {};
  if (filter != "All") {
    queryObj.department = filter;
  }
  if (req.query.workType && req.query.workType != "All") {
    queryObj.workType = req.query.workType;
  }
  if (req.query.remoteOnly && req.query.remoteOnly == "true") {
    queryObj.remote = true;
  }

  let status = req.query.status;
  if (!status) {
    status = "All";
  }
  status = status.toString();
  let date, statQuery;

  if (status === "All") {
    statQuery = "$gte";
    date = new Date(2019);
  } else if (status === "Archived") {
    statQuery = "$lt";
    date = new Date();
  } else {
    statQuery = "$gt";
    date = new Date();
  }

  try {
    let { page, size } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    console.log(queryObj);
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    let totalItems = await Job.countDocuments({
      ...queryObj,
      applyBy: { [statQuery]: date },
    });
    let jobs = await Job.find({ ...queryObj, applyBy: { [statQuery]: date } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).send({ totalItems, page, size, data: jobs });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ errorMsg: err.message });
  }
};
