const Job = require("../../../models/job");

module.exports = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ errorMsg: "Id Not Found!" });
  try {
    await Job.findByIdAndDelete(id).exec();
    const jobs = await Job.find({});
    return res.status(202).send({ jobs: jobs });
  } catch (err) {
    return res.status(406).send({ errorMsg: err.message });
  }
};
