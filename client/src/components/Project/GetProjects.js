import axios from "axios";
const noImageUrl =
  "https://club-of-developers.s3.ap-south-1.amazonaws.com/img-na-text.jpg";
export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/projects")
      .then((response) => {
        let projects = response.data.map((proj, id) => {
          let p = {
            demo: proj.demoUrl,
            description: proj.description
              ? proj.description
              : "some description",
            documentation: proj.documentationUrl,
            github: proj.repoUrl,
            tags: proj.tags,
            key: proj._id,
            id: id,
            leader: proj.developerName,
            project_name: proj.projectName,
            tech_stack: proj.mainStack,
            pic1: proj.imgUrls[0] ? proj.imgUrls[0] : noImageUrl,
            pic2: proj.imgUrls[1] ? proj.imgUrls[1] : noImageUrl,
            pic3: proj.imgUrls[2] ? proj.imgUrls[2] : noImageUrl,
            pic4: proj.imgUrls[3] ? proj.imgUrls[3] : noImageUrl,
            avgRating: proj.avgRating || 0,
            userRating: proj.userRating || 0,
          };
          return p;
        });
        resolve(projects);
        //resolve(response)
      })
      .catch((err) => {
        reject(err);
      });
  });
};
