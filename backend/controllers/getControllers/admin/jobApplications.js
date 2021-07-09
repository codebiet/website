const Job = require('../../../models/job')

module.exports = async(req,res) => {
  const id = req.params.id
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const jobs = await Job.findById(id).select("+applications");
    if (!jobs) return res.status(404).send({ errorMsg: "Job Not Found" });
    const applications = jobs.applications
    return res.send({totalItems: applications.length ,applications: applications.slice(page * limit, (page + 1) * limit)})
  } catch(err) {
    return res.status(500).send({ errorMsg: err.message })
  }
}