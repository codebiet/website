const Project = require("../../models/projectModal");
const uploadImage = require("../../utils/uploadImage");

module.exports = async (req, res) => {
  let imageUrls = [];
  for (
    let i = 0;
    req.files && req.files.images && i < req.files.images.length;
    i++
  ) {
    try {
      const fileUrl = await uploadImage(req.files.images[i]);
      imageUrls.push(fileUrl);
    } catch (err) {
      console.log(err);
      return res.status(406).send({ errorMsg: err });
    }
  }

  const project = new Project({
    projectName: req.body.project_name,
    developerName: req.body.developer_name,
    mainStack: req.body.main_stack,
    description: req.body.description,
    tags: JSON.parse(req.body.tags),
    demoUrl: req.body.demo_url,
    repoUrl: req.body.repo_url,
    imgUrls: imageUrls,
    documentationUrl: req.body.documentation_url,
  });

  try {
    const result = await project.save();
    return res.status(201).send(result);
  } catch (err) {
    console.log(err.message);
    if (err.http_code)
      return res.status(err.http_code).send({ errorMsg: err.message });
    return res.status(406).send({ errorMsg: err.message });
  }
};
