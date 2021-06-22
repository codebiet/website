const Project = require('../../models/projectModal')

module.exports = async(req,res) => {
  try {
    let result =  await Project.findByIdAndUpdate(req.params.project_id,
                  { projectName: req.body.project_name,
                    developerName: req.body.developer_name,
                    mainStack: req.body.main_stack,
                    tags: req.body.tags,
                    imgUrls: req.body.img_urls,
                    demoUrl: req.body.demo_url,
                    repoUrl: req.body.repo_url,
                    documentationUrl: req.body.documentation_url},
                  { safe: true, upsert: true })
                  
    res.status(200).send(result)         
    }catch(err) {
      console.log(err)
      if(err.http_code)
        return res.status(err.http_code).send({ errorMsg: err.message })
      return res.status(406).send({ errorMsg: err.message })
    }

}