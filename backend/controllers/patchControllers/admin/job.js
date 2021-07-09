const Job = require("../../../models/job");

module.exports = async (req, res) => {
  const id = req.params.id;
  const job = req.body.job
  if(isNaN(job.stipend)) {
    delete job.stipend
  }
  try {
    await Job.findByIdAndUpdate(id, job)
    const result = await Job.findById(id);
    return res.send(result);
  } catch (err) {
    console.log(err.message)
    return res.status(406).send({ errMsg: err.message });
  }
};
