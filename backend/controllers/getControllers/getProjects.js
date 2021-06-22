const Project = require('../../models/projectModal')

module.exports = async(req,res) => {
  try {
    let projects = await Project.find();
    return res.status(200).send(projects)
  } catch(err) {
    console.log(err)
    return res.status(406).send({ errorMsg: err.message })
  }
}