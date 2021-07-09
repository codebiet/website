const Job = require("../../../models/job");

module.exports = async (req, res) => {
  let job = req.body.job;
  if (isNaN(job.stipend)) {
    delete job.stipend;
  }
  job = new Job(req.body.job);

  try {
    const result = await job.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(406).send({ errMsg: err.message });
  }
};
